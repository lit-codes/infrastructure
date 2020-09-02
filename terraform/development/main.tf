variable "ssh_key_private" {
  type = string
}

terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = "ap-southeast-1"
}

resource "aws_lightsail_static_ip" "k8s_master_dev" {
  name = "k8_master_static_ip"
}

resource "aws_lightsail_instance" "k8s_master_dev" {
  name              = "k8s_master_dev"
  key_pair_name     = "aminm2"
  blueprint_id      = "ubuntu_18_04"
  bundle_id         = "micro_2_0"
  availability_zone = "ap-southeast-1a"
}

resource "aws_lightsail_static_ip_attachment" "k8s_master_dev" {
  static_ip_name = aws_lightsail_static_ip.k8s_master_dev.id
  instance_name  = aws_lightsail_instance.k8s_master_dev.id
}

resource "local_file" "ansible_group_vars" {
  depends_on  = [aws_lightsail_static_ip.k8s_master_dev, aws_lightsail_instance.k8s_master_dev]
  content     = <<EOF
# This is autogenerated using terraform (DO NOT ADD TO GIT)
---
k3s_version: v1.17.5+k3s1
systemd_dir: /etc/systemd/system
master_ip: "20.0.0.1"
extra_server_args: "--flannel-iface wg0 --write-kubeconfig-mode 644 --no-deploy traefik --no-deploy servicelb --flannel-backend=wireguard --kube-apiserver-arg service-node-port-range=1-65535"
extra_agent_args: "--flannel-iface wg0"
# Directory to store WireGuard configuration on the remote hosts
wireguard_remote_directory: "/etc/wireguard"

# The default port WireGuard will listen if not specified otherwise.
wireguard_port: "54321"

# The default interface name that wireguard should use if not specified otherwise.
wireguard_interface: "wg0"
EOF
  filename    = "${path.module}/../../ansible/inventory/group_vars/all.yml"
}

resource "local_file" "ansible_inventory" {
  depends_on  = [aws_lightsail_static_ip.k8s_master_dev, aws_lightsail_instance.k8s_master_dev, local_file.ansible_group_vars]
  content     = <<EOF
# This is autogenerated using terraform (DO NOT ADD TO GIT)
---
all:
  hosts:
    k8s_master_dev:
      ansible_host: ${aws_lightsail_static_ip.k8s_master_dev.ip_address}
      ansible_python_interpreter: /usr/bin/python3
      wireguard_endpoint: ${aws_lightsail_static_ip.k8s_master_dev.ip_address}
      wireguard_address: "20.0.0.1/24"
      ansible_user: ubuntu
    buster01:
      ansible_host: 192.168.0.156
      ansible_python_interpreter: /usr/bin/python3
      wireguard_endpoint: ""
      wireguard_address: "20.0.0.2/24"
      wireguard_persistent_keepalive: "30"
      ansible_user: admin
    pi01:
      ansible_host: 192.168.0.102
      ansible_python_interpreter: /usr/bin/python3
      wireguard_endpoint: ""
      wireguard_address: "20.0.0.3/24"
      wireguard_persistent_keepalive: "30"
      ansible_user: admin
  children:
    k3s_cluster:
      hosts:
        k8s_master_dev:
        buster01:
        pi01:
    master:
      hosts:
        k8s_master_dev:
    pi:
      hosts:
        pi01:
    node:
      hosts:
        buster01:
        pi01:
EOF
  filename    = "${path.module}/../../ansible/inventory/hosts.yml"
  provisioner "local-exec" {
    command = "aws lightsail --region ap-southeast-1 put-instance-public-ports --instance-name=${aws_lightsail_instance.k8s_master_dev.id} --port-infos fromPort=54321,toPort=54321,protocol=udp fromPort=22,toPort=22,protocol=tcp fromPort=443,toPort=443,protocol=tcp"
  }
  provisioner "local-exec" {
    command = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i ../../ansible/inventory --private-key ${var.ssh_key_private} ../../ansible/provision.yml"
  }
}

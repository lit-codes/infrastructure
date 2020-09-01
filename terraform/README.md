# terraform

This is the place we create our production servers, every aspect of our
production servers are either in this folder, in `ansible` or in `k8s`. The
idea is that we should be able to destroy and recreate our entire
infrastructure without even thinking twice about having to manually configure
our servers.

## Download terraform

If you haven't installed terraform yet, install it from https://www.terraform.io/downloads.html

## Initialization

After downloading terraform, cd to the `terraform` folder and run `terraform
init`, this will install the required dependencies detected from `main.tf`.

Terraform expects passwordless ssh access with `sudo` to `admin` on every server.

### Setting up AWS CLI

If you haven't already use `aws configure` to setup your key/secret for AWS
CLI. Also install the cli using pip rather than your distribution.

On Debian/Ubuntu:

```
sudo apt-get install -y python3-pip
sudo pip3 install awscli
```

Then run configure to set your credentials

```
aws configure
```

## Seeing the changes in action

When you make a change and want to see the effects on the production servers,
simply run `terraform plan` to see what changes will be done before actually
applying them.

## Applying changes to production

If the plan looks good, it's time to apply those changes, you can do that using
`terraform apply`.

## Destroying everything

If you want, you can destroy all the production servers with one command, that
is `terraform destroy`, it will show you the plan to destory and asks for
confirmation of course.

## Apply and destroy scripts

```bash
./apply.sh production
```

```bash
./destroy.sh production # Think twice!
```

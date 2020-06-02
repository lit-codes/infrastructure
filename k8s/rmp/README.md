# RMP analyser deployment

We use [k3s](https://k3s.io/) to run our Kubernetes cluster, this gives us
a balance between our cluster size and our budget. In case this proves to be
inefficient we can easily move our entire infrastructure to Kubernetes clusters
on AWS or GCP without too much effort.

Current nodes running on the Kubernetes cluster:

- `endpoint-sg-1`: this is a Digital Ocean droplet, running our Kubernetes cluster
- `raspberrypi`: which is a Raspberry Pi 4, currently used to run our PG server
- `buster01`: A newly added node, running on Debian Buster

## Node labels

In order to distribute the work-load according to the performance of each node,
we can have labels assigned to each node, to get the current labels run:

```bash
kubectl get nodes --show-labels
```

We have a custom label called `role` to assign pods. Currently `primary` points
to the `endpoint-sg-1` and `worker` points to `raspberrypi` nodes.

## Pods

Pods are the building blocks of Kubernetes, our applications run inside one or
more pods.

To get the current pods and which servers they're running on:

```bash
kubectl get pods -o wide
```

At the moment, we have the following:

```bash
NAME                         READY   STATUS    RESTARTS   AGE     IP           NODE
traefik-5b7bd8645f-rg8hj     1/1     Running   0          2d11h   10.42.0.62   endpoint-sg-1
rmp-redis-645d7f7769-v26mw   1/1     Running   0          45h     10.42.0.68   endpoint-sg-1
rmp-75b8cd7f4b-9vnvn         1/1     Running   0          45h     10.42.0.69   endpoint-sg-1
rmp-db-6d9454fbb-jc6vq       1/1     Running   0          29h     10.42.3.44   raspberrypi
```

## Running a new node

To add a new node to the production cluster (needs the API token):

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://endpoint-sg-1.lit.codes:6443 K3S_TOKEN='[API TOKEN]' sh -
```

This runs a flannel device on the node, connecting it to the wireguard VPN
running on the primary node, this is important because all pods need to be in
the same VPC to communicate.

## Deploy RMP servers

To deploy production servers, you can apply the Kubernetes manifest files, the
order should not matter much, but to avoid pod restarts better to follow the
order below:

```bash
kubectl apply -f rmp-secret.yaml # careful about this one
kubectl apply -f rmp.yaml
kubectl apply -f rmp-db.yaml
kubectl apply -f rmp-redis.yaml
kubectl apply -f ../traefik/routes.yaml # Only if you use Traefik
```

## Connect to the production API from localhost

You can redirect the port `4000` (the default port API runs on), to your
localhost to connect directly to the API, bypassing the `traefik` reverse
proxy. This is useful for debugging purposes and to test your code against the
production servers.

```bash
kubectl port-forward `kubectl get pod -l app=rmp -o name` 4000
xdg-open http://localhost:4000
```

## Recovering DB backups

The PostgreSQL pod has a Persistant Volume that contains its data, in case that
volume is lost for any reason, we have regular backups from the DB on this
link, which can be used to recover the DB.

This is part of our disaster recovery plan and should not be done unless, well,
there's been a disaster with the DB :)

Download the [pg_dump
file](https://drive.google.com/file/d/1n1w6wdfBg7cgdpXkFOTCOmkr5oEOr45j/view?usp=sharing)

`gunzip` the file:

```bash
gunzip pgdump.tar.gz
```

Copy it to the pod:

```bash
kubectl cp pgdump.tar `kubectl get pod -l app=rmp-db -o name`:/var/tmp/pgdump.tar
```

Login to the newly created `rmp-db` pod:

```bash
kubectl exec -it `kubectl get pod -l app=rmp-db -o name` -- bash
$ psql -U rmp -c 'create role postgres'
$ pg_restore -Cc -U rmp -d rmp /var/tmp/pgdump.tar
```

# Traefik deployment

We use [Traefik v2.0](https://docs.traefik.io/) to serve our web to the world,
Traefik is a reverse proxy and can be configured as a load-balancer as well.

## Deploying the manifests

Traefik deployment can be created by applying these manifests, keep the
ordering for better performance:

```bash
kubectl apply -f cloudflarecertsecret.yaml
kubectl apply -f definitions.yaml
kubectl apply -f services.yaml
kubectl apply -f deployments.yaml
```

## Deploying the ingress routes

`ingress` routes are defined in a separate manifest called `routes.yaml`, this
is the file that changes most of the time and needs to be applied:

```bash
kubectl apply -f routes.yaml
```

## Deleting ingress routes

To delete a route, simply remove its definition from `routes.yaml` and remove
the route definition:

```bash
kubectl delete ingressroutes.traefik.containo.us [name of the route]
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

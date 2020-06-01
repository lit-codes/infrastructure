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

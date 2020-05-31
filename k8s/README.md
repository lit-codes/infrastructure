# Kubernetes files

# Deploy RMP servers

```bash
kubectl apply -f rmp.yaml
kubectl apply -f rmp-db.yaml
kubectl apply -f rmp-redis.yaml
kubectl apply -f routes.yaml # Optional, only do if you use Traefik
```

# Test the UI on localhost

```bash
kubectl port-forward rmp-[the rest] 4000
xdg-open http://localhost:4000
```

# Deploy DBs

Download the [pg_dump file](https://drive.google.com/file/d/1n1w6wdfBg7cgdpXkFOTCOmkr5oEOr45j/view?usp=sharing)

Login to the `rmp-db` pod:

```bash
kubectl exec -it rmp-db-[the rest] -- bash
$ psql -U rmp
rmp# create role postgres;
#\q
$ pg_restore -Cc -U rmp -d rmp pgdump.tar
```

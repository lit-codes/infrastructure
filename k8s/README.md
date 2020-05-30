# Kubernetes files

# Deploy RMP servers

Download the [pg_dump file](https://drive.google.com/file/d/1c3L7gmQv851SXh-5EO_Ohvatn2qd_SiY/view?usp=sharing)

```bash
kubectl apply -f rmp.yaml
kubectl apply -f rmp-db.yaml
kubectl apply -f rmp-redis.yaml
kubectl apply -f routes.yaml # Optional, only do if you use Traefik
kubectl port-forward rmp-db-* 5432
psql -U rmp -p 5432 -h localhost postgres -c 'create role postgres'
tar -O -xf dbdump.tgz |psql -U rmp -p 5432 -h localhost postgres
```

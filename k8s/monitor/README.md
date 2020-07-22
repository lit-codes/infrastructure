# Monitoring Service

## Install [prometheus-operator](https://hub.helm.sh/charts/stable/prometheus-operator)

This chart includes pre-configured Prometheus & Grafana.

install flags:
[prometheus-operator.yml](prometheus-operator.yml)
secret.yml: Create it locally:
```yaml
grafana:
  adminPassword: PASSWORD
```

```bash
helm repo update
helm search repo prometheus
helm install --create-namespace --namespace monitoring prometheus-opera stable/prometheus-operator -f prometheus-operator.yml -f secret.yml
```

## Uninstall prometheus-operator
```bash
helm uninstall --namespace monitoring prometheus-opera
```

## Show prometheus-opera pods
```bash
kubectl -n monitoring get pods -o wide
```

## Show prometheus-opera services with selectors
```bash
kubectl -n monitoring get services -o wide
```

## Port-forward Grafana & Prometheus
```bash
kubectl -n monitoring port-forward `kubectl -n monitoring get pod -l app.kubernetes.io/name=grafana -o name` 3000 &
kubectl -n monitoring port-forward `kubectl -n monitoring get pod -l app=prometheus -o name` 9090 &
```

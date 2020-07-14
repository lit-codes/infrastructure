# Monitoring Service

## Install [prometheus-operator](https://hub.helm.sh/charts/stable/prometheus-operator)

prometheus-operator includes pre-configured prometheus & grafana
flags: [prometheus-operator.yml](prometheus-operator.yml)

```bash
helm repo update
helm search repo prometheus
helm install prometheus-opera stable/prometheus-operator -f prometheus-operator.yml
```

## Uninstall prometheus-operator

```bash
helm uninstall prometheus-opera
```

## Show prometheus-opera pods
```bash
kubectl --namespace default get pods -l "release=prometheus-opera"
```

## Show (and edit) grafana secret
```bash
kubectl edit secrets prometheus-opera-grafana
```
# Kubernetes projects

## rmp

This is our ratemyprofessor.com analyser Kubernetes manifests, it contains
everything needed to start our rmp servers including the API and DBs. See [rmp
README](rmp/README.md)

## Traefik

Traefik is a reverse-proxy, running on the master node of our Kubernetes
cluster, and is responsible of serving our web to the world. See [traefik
README]( traefik/README.md )

## wp-helm

This is the Helm config for `bitnami/wordpress` helm chart, and is used for my
wordpress projects.

## monitor

This is Helm commands for setting up monitoring using Prometheus & Grafana.
See [monitor README](monitor/README.md)
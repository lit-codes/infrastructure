#!/bin/bash

set -e

kubectl apply -f seen-secret.yaml
kubectl apply -f seen-db.yaml
cat seen.yaml | sed "s/{{TAG}}/$TAG/g" | kubectl apply -f -

# Install load balancers
kubectl apply -f load-balancer.yaml
echo Application Load Balancer accessible from:
kubectl get svc seen-lb -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' | cat -
echo

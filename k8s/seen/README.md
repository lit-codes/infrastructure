# Email Seen service on K8s

## Set up EKS cluster using cloudformation

To create a cluster using cloudformation and set up kubernetes config locally:

```
cd cloudformation
./create.sh
```

Visit the automatically generated domain to login to Jenkins and add the github
project.

## How to use the project

Visit the load balancer URL

```
kubectl --kubeconfig /tmp/kubeconfig get svc seen-lb
```


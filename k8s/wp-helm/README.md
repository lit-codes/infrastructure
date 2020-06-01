NOTES:
1. Get the WordPress URL:

  echo "WordPress URL: http://127.0.0.1:8080/"
  echo "WordPress Admin URL: http://127.0.0.1:8080/admin"
  kubectl port-forward --namespace default svc/[deployment name]-wordpress 8080:80

2. Login with the following credentials to see your blog

  echo Username: user
  echo Password: $(kubectl get secret --namespace default [deployment name]-wordpress -o jsonpath="{.data.wordpress-password}" | base64 --decode)


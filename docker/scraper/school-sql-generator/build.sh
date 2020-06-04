IMAGE=litcodes/school-sql-generator:$1
docker build -t $IMAGE .
docker push $IMAGE

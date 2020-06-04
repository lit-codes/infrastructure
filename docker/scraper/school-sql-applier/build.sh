IMAGE=litcodes/school-sql-applier:$1
docker build -t $IMAGE .
docker push $IMAGE

IMAGE=litcodes/teacher-sql-generator:$1
docker build -t $IMAGE .
docker push $IMAGE

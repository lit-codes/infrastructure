docker build -t litcodes/school-sql-generator:$1 .
docker tag litcodes/school-sql-generator:$1 litcodes/school-sql-generator:latest
docker push litcodes/school-sql-generator:$1
docker push litcodes/school-sql-generator:latest

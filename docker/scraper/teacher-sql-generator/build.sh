docker build -t litcodes/teacher-sql-generator:$1 .
docker tag litcodes/teacher-sql-generator:$1 litcodes/teacher-sql-generator:latest
docker push litcodes/teacher-sql-generator:$1
docker push litcodes/teacher-sql-generator:latest

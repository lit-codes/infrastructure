docker build -t litcodes/teacher-sql-applier:$1 .
docker tag litcodes/teacher-sql-applier:$1 litcodes/teacher-sql-applier:latest
docker push litcodes/teacher-sql-applier:$1
docker push litcodes/teacher-sql-applier:latest

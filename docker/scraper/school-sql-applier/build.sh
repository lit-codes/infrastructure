docker build -t litcodes/school-sql-applier:$1 .
docker tag litcodes/school-sql-applier:$1 litcodes/school-sql-applier:latest
docker push litcodes/school-sql-applier:$1
docker push litcodes/school-sql-applier:latest

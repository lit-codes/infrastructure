docker build -t litcodes/teacher-scraper:$1 .
docker tag litcodes/teacher-scraper:$1 litcodes/teacher-scraper:latest
docker push litcodes/teacher-scraper:$1
docker push litcodes/teacher-scraper:latest

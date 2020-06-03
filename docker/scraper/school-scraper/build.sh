docker build -t litcodes/school-scraper:$1 .
docker tag litcodes/school-scraper:$1 litcodes/school-scraper:latest
docker push litcodes/school-scraper:$1
docker push litcodes/school-scraper:latest

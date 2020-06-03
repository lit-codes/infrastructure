# Scraper

These are the images used to do the scraping pipeline, each worker takes things
from one queue and pushes them to another. Errors are pushed to the same queue
with the `failed_` prefix.

At the moment some fields are calculated without considering NULL values, and
that leads to incorrect information. The scraping needs to be done again to fix
that mistake.

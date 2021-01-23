COPY department FROM '/docker-entrypoint-initdb.d/department.csv' DELIMITER ',' CSV HEADER;
COPY school FROM '/docker-entrypoint-initdb.d/school.csv' DELIMITER ',' CSV HEADER;
COPY school_ratings FROM '/docker-entrypoint-initdb.d/school_ratings.csv' DELIMITER ',' CSV HEADER;
COPY teacher FROM '/docker-entrypoint-initdb.d/teacher.csv' DELIMITER ',' CSV HEADER;
COPY teacher_ratings FROM '/docker-entrypoint-initdb.d/teacher_ratings.csv' DELIMITER ',' CSV HEADER;

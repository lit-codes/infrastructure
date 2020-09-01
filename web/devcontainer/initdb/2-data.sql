COPY school
FROM '/docker-entrypoint-initdb.d/data/school.csv'
DELIMITER ',' 
CSV HEADER;

COPY department
FROM '/docker-entrypoint-initdb.d/data/department.csv'
DELIMITER ',' 
CSV HEADER;

COPY teacher
FROM '/docker-entrypoint-initdb.d/data/teacher.csv'
DELIMITER ',' 
CSV HEADER;

COPY school_ratings
FROM '/docker-entrypoint-initdb.d/data/school_ratings.csv'
DELIMITER ',' 
CSV HEADER;

COPY teacher_ratings
FROM '/docker-entrypoint-initdb.d/data/teacher_ratings.csv'
DELIMITER ',' 
CSV HEADER;

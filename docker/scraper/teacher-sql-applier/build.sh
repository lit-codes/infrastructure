platforms="$@"
DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --platform $platforms --push -t litcodes/teacher-sql-applier:latest .

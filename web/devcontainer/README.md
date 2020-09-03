# RMP devcontainer with Docker-Compose

## Prerequisites

1. install docker
2. install docker-compose (included in Docker Desktop for Windows)
3. On Windows, make sure Docker Desktop is running
4. Make sure you have set up your ssh key in gitlab.
5. install parcel

```bash
npm install -g parcel@next
```

## Run:

```bash
./initdb.sh #on first run
./start.sh
```

## Getting Started

1. Start devcontainer: `./start.sh`
2. Visit http://localhost:4000/#/build?query={%22dimensions%22:[%22Teacher.teacherId%22],%22timeDimensions%22:[]} to get the list of teacher IDs
3. See the teacher http://localhost:3000/?tid=[teacher id]
4. Edit source files and parcel will automatically build and reload the project

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
3. Run the app locally using `npm run dev`, see the teacher http://localhost:3000/?tid=[teacher id]
4. Edit source files and your project will be automatically built

## Running the front-end app locally

The above commands will run the backend application on `http://127.0.0.1:4000`,
you would still need to run the front-end application locally, using the usualy
commands:

```
npm install
npm run dev
```

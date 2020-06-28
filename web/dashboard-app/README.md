# rmp-fe

Front-end of the RMP app

## Install dependencies

```bash
npm install
```

## Serve the files

The following command will start a web server on port 3000 and serves
the files built for production.

```
npm start
```

## Development

Bundling is done by `parcel` which is a zero-config bundler for JS. The build
files are stored in `dist/`. It comes with `hot-reload` meaning that your
changes will be automatically applied to the browser immediately after you
saved the source file, without refreshing.

```bash
npm run dev
```

## Linting

It's good practice to have a standard coding style, we will use `eslint` for
linting and automatically styling our code to achieve a resonable consistency.

To check for style errors run:

```bash
npm run lint
```

To fix the errors on a best-effort basis:

```bash
npm run fix
```

Further into the project we can enforce the style using precommit hooks.

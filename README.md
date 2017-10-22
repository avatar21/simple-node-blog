# Simple Node Blog

# Initial Steps

- setup

```sh
$ npm install
```

- startup server

```sh
$ node bin/www
```

- startup server in background

```sh
$ forever start bin/www
```

- list and stop server in background

```sh
$ forever list // finds out the running instance
$ forever stop AAAA // given AAAA is the running instance's pid
```

## Summary

read from markdown (*.md), publish it into blog

## TODO

- read from markdown file, put them in DB
- some sort of caching mechanism to speed things up


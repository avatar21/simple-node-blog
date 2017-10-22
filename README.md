# Simple Node Blog

## Summary

read from markdown (*.md), publish it into blog

# Initial Steps

1. setup

```sh
$ npm install
```

1. startup server

```sh
$ node bin/www
```

    OR startup server in background

```sh
$ forever start bin/www
```

1. list and stop server in background

```sh
$ forever list // finds out the running instance
$ forever stop AAAA // given AAAA is the running instance's pid
```

## TODO

- read from markdown file, put them in DB
- some sort of caching mechanism to speed things up


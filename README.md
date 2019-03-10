# blunderlist-comment-ts [![Build Status](https://travis-ci.com/tomasbasham/blunderlist-comment-ts.svg?branch=master)](https://travis-ci.com/tomasbasham/blunderlist-comment-ts)

A fictitious todo application through which to teach how to implement a
microservice architecture. For the full list of services required to run this
application visit
[Blunderlist](https://github.com/tomasbasham?utf8=✓&tab=repositories&q=blunderlist)
on GitHub.

This repository implements an comment API that manages the

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node](https://golang.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Docker](https://www.docker.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd blunderlist-comment-ts`
* `docker build -t comment-ts .`

## Running / Development

* `docker run --rm -it -p 8080:8080 --env-file .env comment-ts`
* Visit your app at [http://localhost:8080](http://localhost:8080).

## Further Reading / Useful Links

* [TypeScript](https://www.typescriptlang.org/)
* [gRPC](https://grpc.io/)
* [protobuf](https://developers.google.com/protocol-buffers/)

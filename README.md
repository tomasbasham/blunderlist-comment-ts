# blunderlist-comment-ts

This README outlines the details of collaborating on this TypeScript
application. A short introduction of this app could easily go here.

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

import {
  CommentService,
  ICommentServer
} from './blunderlist_comment_v1/comment_grpc_pb';

import {
  CommentListRequest,
  CommentQuery,
  CommentResponse,
  CommentCreateRequest,
  CommentUpdateRequest
} from './blunderlist_comment_v1/comment_pb';

import {
  HealthService,
  IHealthServer
} from './@grpc-health-check/v1/health_grpc_pb';

import {
  HealthCheckRequest,
  HealthCheckResponse
} from './@grpc-health-check/v1/health_pb';

import { Store } from './store'

import * as grpc from 'grpc';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class Server implements ICommentServer, IHealthServer {
  constructor(private store: Store) { }

  serve(port: string) {
    const server = new grpc.Server();

    server.addService(CommentService, this as ICommentServer);
    server.addService(HealthService, this as IHealthServer);

    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());

    console.log(`server started on 0.0.0.0:${port}`);
    server.start();
  }

  async listComments(call: grpc.ServerWriteableStream<CommentListRequest>) {
    const comments = await this.store.getComments(call.request.getParentId());

    for (const comment of comments) {
      call.write(comment);
    }

    call.end();
  }

  async getComment(call: grpc.ServerUnaryCall<CommentQuery>, callback: grpc.sendUnaryData<CommentResponse>) {
    const comment = await this.store.getComment(call.request.getId());
    callback(null, comment);
  }

  async createComment(call: grpc.ServerUnaryCall<CommentCreateRequest>, callback: grpc.sendUnaryData<CommentResponse>) {
    const comment = await this.store.createComment(call.request);
    callback(null, comment);
  }

  async updateComment(call: grpc.ServerUnaryCall<CommentUpdateRequest>, callback: grpc.sendUnaryData<CommentResponse>) {
    const comment = await this.store.updateComment(call.request);
    callback(null, comment);
  }

  async deleteComment(call: grpc.ServerUnaryCall<CommentQuery>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>) {
    await this.store.deleteComment(call.request.getId());
    callback(null, new google_protobuf_empty_pb.Empty());
  }

  // Check is used by clients to know when the service is ready. It will check
  // that there is an active connection to the database, establishing a
  // connection if necessary.
  check(call: grpc.ServerUnaryCall<HealthCheckRequest>, callback: grpc.sendUnaryData<HealthCheckResponse>) {
    const statusResponse = new HealthCheckResponse();
    statusResponse.setStatus(HealthCheckResponse.ServingStatus.SERVING);

    if (!this.store.ping()) {
      statusResponse.setStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
    }

    callback(null, statusResponse);
  }

  // Watch is used by clients to receive updates when the service status
  // changes. Here it has no meaningful implementation just to satisfy the
  // interface.
  watch(call: grpc.ServerWriteableStream<HealthCheckRequest>) {
    return call.end()
  }
}

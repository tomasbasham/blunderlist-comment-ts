// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 The gRPC Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// The canonical version of this proto can be found at
// https://github.com/grpc/grpc-proto/blob/master/grpc/health/v1/health.proto
//
'use strict';
var grpc = require('grpc');
var health_pb = require('./health_pb.js');

function serialize_grpc_health_v1_HealthCheckRequest(arg) {
  if (!(arg instanceof health_pb.HealthCheckRequest)) {
    throw new Error('Expected argument of type grpc.health.v1.HealthCheckRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_health_v1_HealthCheckRequest(buffer_arg) {
  return health_pb.HealthCheckRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_health_v1_HealthCheckResponse(arg) {
  if (!(arg instanceof health_pb.HealthCheckResponse)) {
    throw new Error('Expected argument of type grpc.health.v1.HealthCheckResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_health_v1_HealthCheckResponse(buffer_arg) {
  return health_pb.HealthCheckResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var HealthService = exports.HealthService = {
  // If the requested service is unknown, the call will fail with status
  // NOT_FOUND.
  check: {
    path: '/grpc.health.v1.Health/Check',
    requestStream: false,
    responseStream: false,
    requestType: health_pb.HealthCheckRequest,
    responseType: health_pb.HealthCheckResponse,
    requestSerialize: serialize_grpc_health_v1_HealthCheckRequest,
    requestDeserialize: deserialize_grpc_health_v1_HealthCheckRequest,
    responseSerialize: serialize_grpc_health_v1_HealthCheckResponse,
    responseDeserialize: deserialize_grpc_health_v1_HealthCheckResponse,
  },
  // Performs a watch for the serving status of the requested service.
  // The server will immediately send back a message indicating the current
  // serving status.  It will then subsequently send a new message whenever
  // the service's serving status changes.
  //
  // If the requested service is unknown when the call is received, the
  // server will send a message setting the serving status to
  // SERVICE_UNKNOWN but will *not* terminate the call.  If at some
  // future point, the serving status of the service becomes known, the
  // server will send a new message with the service's serving status.
  //
  // If the call terminates with status UNIMPLEMENTED, then clients
  // should assume this method is not supported and should not retry the
  // call.  If the call terminates with any other status (including OK),
  // clients should retry the call with appropriate exponential backoff.
  watch: {
    path: '/grpc.health.v1.Health/Watch',
    requestStream: false,
    responseStream: true,
    requestType: health_pb.HealthCheckRequest,
    responseType: health_pb.HealthCheckResponse,
    requestSerialize: serialize_grpc_health_v1_HealthCheckRequest,
    requestDeserialize: deserialize_grpc_health_v1_HealthCheckRequest,
    responseSerialize: serialize_grpc_health_v1_HealthCheckResponse,
    responseDeserialize: deserialize_grpc_health_v1_HealthCheckResponse,
  },
};

exports.HealthClient = grpc.makeGenericClientConstructor(HealthService);

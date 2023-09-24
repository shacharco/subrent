// const grpc = require('@grpc/grpc-js');
// const protoLoader = require('@grpc/proto-loader');
// const PROTO_PATH = __dirname + '/../../data/db.proto';
// const packageDefinition = protoLoader.loadSync(
//     PROTO_PATH,
//     {keepCase: true,
//      longs: String,
//      enums: String,
//      defaults: true,
//      oneofs: true
//     });
// const dbProto = grpc.loadPackageDefinition(packageDefinition).db;
// const client = new dbProto('localhost:50051',
//                                        grpc.credentials.createInsecure());


const caller = require('grpc-caller')
const PROTO_PATH = __dirname + '/../../data/db.proto';
const client = caller('0.0.0.0:50051', PROTO_PATH, 'db')

module.exports = client;
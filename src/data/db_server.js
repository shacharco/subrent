const db_api = require("./db");
const grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var PROTO_PATH = __dirname + '/db.proto';
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var dbProto = grpc.loadPackageDefinition(packageDefinition).db;

function getServer() {
    let server = new grpc.Server();
    server.addService(dbProto.service, {
        CreateRental: db_api.createRental,
        CreateComment: db_api.createComment,
        CreateRating: db_api.createRating,
        CreateUser: db_api.createUser,

        ListRentals: db_api.listRentals,
        ListComments: db_api.listComments,
        ListRatings: db_api.listRatings,
        listUsers: db_api.listUsers,

        GetRental: db_api.getRental,
        GetUser: db_api.getUser,

        DeleteRental: db_api.deleteRental,
        DeleteComment: db_api.deleteComment,
        DeleteRating: db_api.deleteRating,
        DeleteUser: db_api.deleteUser,
    });
    return server;
}
var dbServer = getServer();
dbServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    dbServer.start();
});
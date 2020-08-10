"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpcWeb = require("grpc-web");
const jspb = require("google-protobuf");
var GrpcType;
(function (GrpcType) {
    GrpcType[GrpcType["Any"] = 0] = "Any";
    GrpcType[GrpcType["Int32"] = 1] = "Int32";
    GrpcType[GrpcType["Int32String"] = 2] = "Int32String";
    GrpcType[GrpcType["Int64"] = 3] = "Int64";
    GrpcType[GrpcType["Int64String"] = 4] = "Int64String";
    GrpcType[GrpcType["Uint32"] = 5] = "Uint32";
    GrpcType[GrpcType["Uint32String"] = 6] = "Uint32String";
    GrpcType[GrpcType["Uint64"] = 7] = "Uint64";
    GrpcType[GrpcType["Uint64String"] = 8] = "Uint64String";
    GrpcType[GrpcType["Sint32"] = 9] = "Sint32";
    GrpcType[GrpcType["Sint64"] = 10] = "Sint64";
    GrpcType[GrpcType["SintHash64"] = 11] = "SintHash64";
    GrpcType[GrpcType["Sint64String"] = 12] = "Sint64String";
    GrpcType[GrpcType["Fixed32"] = 13] = "Fixed32";
    GrpcType[GrpcType["Fixed64"] = 14] = "Fixed64";
    GrpcType[GrpcType["Fixed64String"] = 15] = "Fixed64String";
    GrpcType[GrpcType["Sfixed32"] = 16] = "Sfixed32";
    GrpcType[GrpcType["Sfixed64"] = 17] = "Sfixed64";
    GrpcType[GrpcType["Sfixed64String"] = 18] = "Sfixed64String";
    GrpcType[GrpcType["Float"] = 19] = "Float";
    GrpcType[GrpcType["Double"] = 20] = "Double";
    GrpcType[GrpcType["Bool"] = 21] = "Bool";
    GrpcType[GrpcType["Enum"] = 22] = "Enum";
    GrpcType[GrpcType["String"] = 23] = "String";
    GrpcType[GrpcType["MessageSet"] = 24] = "MessageSet";
    GrpcType[GrpcType["Group"] = 25] = "Group";
    GrpcType[GrpcType["Bytes"] = 26] = "Bytes";
    GrpcType[GrpcType["FixedHash64"] = 27] = "FixedHash64";
    GrpcType[GrpcType["VarintHash64"] = 28] = "VarintHash64";
    GrpcType[GrpcType["SplitFixed64"] = 29] = "SplitFixed64";
    GrpcType[GrpcType["SplitVarint64"] = 30] = "SplitVarint64";
    GrpcType[GrpcType["SplitZigzagVarint64"] = 31] = "SplitZigzagVarint64";
    GrpcType[GrpcType["RepeatedInt32"] = 32] = "RepeatedInt32";
    GrpcType[GrpcType["RepeatedInt32String"] = 33] = "RepeatedInt32String";
    GrpcType[GrpcType["RepeatedInt64"] = 34] = "RepeatedInt64";
    GrpcType[GrpcType["RepeatedSplitVarint64"] = 35] = "RepeatedSplitVarint64";
    GrpcType[GrpcType["RepeatedSplitZigzagVarint64"] = 36] = "RepeatedSplitZigzagVarint64";
    GrpcType[GrpcType["RepeatedInt64String"] = 37] = "RepeatedInt64String";
    GrpcType[GrpcType["RepeatedUint32"] = 38] = "RepeatedUint32";
    GrpcType[GrpcType["RepeatedUint32String"] = 39] = "RepeatedUint32String";
    GrpcType[GrpcType["RepeatedUint64"] = 40] = "RepeatedUint64";
    GrpcType[GrpcType["RepeatedUint64String"] = 41] = "RepeatedUint64String";
    GrpcType[GrpcType["RepeatedSint32"] = 42] = "RepeatedSint32";
    GrpcType[GrpcType["RepeatedSint64"] = 43] = "RepeatedSint64";
    GrpcType[GrpcType["RepeatedSint64String"] = 44] = "RepeatedSint64String";
    GrpcType[GrpcType["RepeatedSintHash64"] = 45] = "RepeatedSintHash64";
    GrpcType[GrpcType["RepeatedFixed32"] = 46] = "RepeatedFixed32";
    GrpcType[GrpcType["RepeatedFixed64"] = 47] = "RepeatedFixed64";
    GrpcType[GrpcType["RepeatedFixed64String"] = 48] = "RepeatedFixed64String";
    GrpcType[GrpcType["RepeatedSfixed32"] = 49] = "RepeatedSfixed32";
    GrpcType[GrpcType["RepeatedSfixed64"] = 50] = "RepeatedSfixed64";
    GrpcType[GrpcType["RepeatedSfixed64String"] = 51] = "RepeatedSfixed64String";
    GrpcType[GrpcType["RepeatedFloat"] = 52] = "RepeatedFloat";
    GrpcType[GrpcType["RepeatedDouble"] = 53] = "RepeatedDouble";
    GrpcType[GrpcType["RepeatedBool"] = 54] = "RepeatedBool";
    GrpcType[GrpcType["RepeatedEnum"] = 55] = "RepeatedEnum";
    GrpcType[GrpcType["RepeatedString"] = 56] = "RepeatedString";
    GrpcType[GrpcType["RepeatedBytes"] = 57] = "RepeatedBytes";
    GrpcType[GrpcType["RepeatedFixedHash64"] = 58] = "RepeatedFixedHash64";
    GrpcType[GrpcType["RepeatedVarintHash64"] = 59] = "RepeatedVarintHash64";
    GrpcType[GrpcType["PackedInt32"] = 60] = "PackedInt32";
    GrpcType[GrpcType["PackedInt32String"] = 61] = "PackedInt32String";
    GrpcType[GrpcType["PackedInt64"] = 62] = "PackedInt64";
    GrpcType[GrpcType["PackedSplitFixed64"] = 63] = "PackedSplitFixed64";
    GrpcType[GrpcType["PackedSplitVarint64"] = 64] = "PackedSplitVarint64";
    GrpcType[GrpcType["PackedSplitZigzagVarint64"] = 65] = "PackedSplitZigzagVarint64";
    GrpcType[GrpcType["PackedInt64String"] = 66] = "PackedInt64String";
    GrpcType[GrpcType["PackedUint32"] = 67] = "PackedUint32";
    GrpcType[GrpcType["PackedUint32String"] = 68] = "PackedUint32String";
    GrpcType[GrpcType["PackedUint64"] = 69] = "PackedUint64";
    GrpcType[GrpcType["PackedUint64String"] = 70] = "PackedUint64String";
    GrpcType[GrpcType["PackedSint32"] = 71] = "PackedSint32";
    GrpcType[GrpcType["PackedSint64"] = 72] = "PackedSint64";
    GrpcType[GrpcType["PackedSint64String"] = 73] = "PackedSint64String";
    GrpcType[GrpcType["PackedSintHash64"] = 74] = "PackedSintHash64";
    GrpcType[GrpcType["PackedFixed32"] = 75] = "PackedFixed32";
    GrpcType[GrpcType["PackedFixed64"] = 76] = "PackedFixed64";
    GrpcType[GrpcType["PackedFixed64String"] = 77] = "PackedFixed64String";
    GrpcType[GrpcType["PackedSfixed32"] = 78] = "PackedSfixed32";
    GrpcType[GrpcType["PackedSfixed64"] = 79] = "PackedSfixed64";
    GrpcType[GrpcType["PackedSfixed64String"] = 80] = "PackedSfixed64String";
    GrpcType[GrpcType["PackedFloat"] = 81] = "PackedFloat";
    GrpcType[GrpcType["PackedDouble"] = 82] = "PackedDouble";
    GrpcType[GrpcType["PackedBool"] = 83] = "PackedBool";
    GrpcType[GrpcType["PackedEnum"] = 84] = "PackedEnum";
    GrpcType[GrpcType["PackedFixedHash64"] = 85] = "PackedFixedHash64";
    GrpcType[GrpcType["PackedVarintHash64"] = 86] = "PackedVarintHash64";
})(GrpcType = exports.GrpcType || (exports.GrpcType = {}));
var GrpcErrorCode;
(function (GrpcErrorCode) {
    GrpcErrorCode[GrpcErrorCode["OK"] = 0] = "OK";
    GrpcErrorCode[GrpcErrorCode["Cancelled"] = 1] = "Cancelled";
    GrpcErrorCode[GrpcErrorCode["Unknown"] = 2] = "Unknown";
    GrpcErrorCode[GrpcErrorCode["InvalidArgument"] = 3] = "InvalidArgument";
    GrpcErrorCode[GrpcErrorCode["DeadlineExceeded"] = 4] = "DeadlineExceeded";
    GrpcErrorCode[GrpcErrorCode["NotFound"] = 5] = "NotFound";
    GrpcErrorCode[GrpcErrorCode["AlreadyExists"] = 6] = "AlreadyExists";
    GrpcErrorCode[GrpcErrorCode["PermissionDenied"] = 7] = "PermissionDenied";
    GrpcErrorCode[GrpcErrorCode["ResourceExhausted"] = 8] = "ResourceExhausted";
    GrpcErrorCode[GrpcErrorCode["FailedPrecondition"] = 9] = "FailedPrecondition";
    GrpcErrorCode[GrpcErrorCode["Aborted"] = 10] = "Aborted";
    GrpcErrorCode[GrpcErrorCode["OutOfRange"] = 11] = "OutOfRange";
    GrpcErrorCode[GrpcErrorCode["Unimplemented"] = 12] = "Unimplemented";
    GrpcErrorCode[GrpcErrorCode["Internal"] = 13] = "Internal";
    GrpcErrorCode[GrpcErrorCode["Unavailable"] = 14] = "Unavailable";
    GrpcErrorCode[GrpcErrorCode["DataLoss"] = 15] = "DataLoss";
    GrpcErrorCode[GrpcErrorCode["Unauthenticated"] = 1] = "Unauthenticated";
})(GrpcErrorCode || (GrpcErrorCode = {}));
const indexOrDefault = (array, index, _default) => {
    if (!array || index >= array.length) {
        return _default;
    }
    return array[index];
};
class GrpcService {
    constructor(args = {}) {
        args = Object.assign({ host: "", format: "text" }, args);
        this.client = new grpcWeb.GrpcWebClientBase({ format: args.format, suppressCorsPreflight: args.suppressCorsPreflight });
        this.host = args.host;
    }
    unaryCall(args, ...params) {
        args = this.parseRpcCallArgs(args);
        return new Promise((resolve, reject) => {
            this.client.rpcCall(`${this.host}${args.service}`, { array: params }, args.metadata, this.createMethodDescriptor(args, false), (error, response) => {
                if (error) {
                    return reject(error);
                }
                return resolve(response);
            });
        });
    }
    serverStreaming(args, ...params) {
        args = this.parseRpcCallArgs(args);
        return this.client.serverStreaming(`${this.host}${args.service}`, { array: params }, args.metadata, this.createMethodDescriptor(args, true));
    }
    parseRpcCallArgs(args) {
        args = Object.assign({
            metadata: {},
            request: new Array(),
            reply: new Array(),
            resultNames: new Array()
        }, args);
        if (!args.service) {
            throw args.service;
        }
        return args;
    }
    createMethodDescriptor(args, isStreaming) {
        return new grpcWeb.MethodDescriptor(args.service, (isStreaming ? grpcWeb.MethodType.SERVER_STREAMING : grpcWeb.MethodType.UNARY), function (opt) {
            jspb.Message.initialize(this, opt, 0, -1, null, null);
        }, function (opt) {
            jspb.Message.initialize(this, opt, 0, -1, null, null);
        }, request => this.serializeBinary(request, args.request), bytes => this.deserializeBinary(bytes, args));
    }
    serializeBinary(request, requestTypes) {
        const writer = new jspb.BinaryWriter();
        this.serializeBinaryToWriter(request, writer, requestTypes);
        return writer.getResultBuffer();
    }
    serializeBinaryToWriter(message, writer, requestTypes) {
        for (let i = 0, l = message.array.length; i < l; i++) {
            let type = GrpcType[indexOrDefault(requestTypes, i, GrpcType.String)];
            writer["write" + type](i + 1, message.array[i]);
        }
    }
    ;
    deserializeBinary(bytes, args) {
        const result = {};
        const reader = new jspb.BinaryReader(bytes);
        while (reader.nextField()) {
            if (reader.isEndGroup()) {
                break;
            }
            let field = reader.getFieldNumber();
            let name;
            let replyValue = indexOrDefault(args.reply, field - 1, GrpcType.String);
            let replyType;
            if (replyValue instanceof Object && !(replyValue instanceof Array)) {
                let entries = Object.entries(replyValue);
                name = entries[0][0];
                replyType = entries[0][1];
            }
            else {
                name = field;
                replyType = replyValue;
            }
            if (!(replyType instanceof Array)) {
                let type = GrpcType[replyType];
                result[name] = reader["read" + type]();
            }
            else {
                const message = {};
                reader.readMessage(message, (msg, reader) => this.deserializeMessage(msg, reader, replyType));
                let value = result[name];
                if (value) {
                    value.push(message);
                }
                else {
                    result[name] = [message];
                }
            }
        }
        return result;
    }
    deserializeMessage(message, reader, replyTypes) {
        while (reader.nextField()) {
            if (reader.isEndGroup()) {
                break;
            }
            let field = reader.getFieldNumber();
            let name;
            let replyValue = indexOrDefault(replyTypes, field - 1, GrpcType.String);
            let replyType;
            if (replyValue instanceof Object) {
                let entries = Object.entries(replyValue);
                name = entries[0][0];
                replyType = entries[0][1];
            }
            else {
                name = field;
                replyType = replyValue;
            }
            let type = GrpcType[replyType];
            message[name] = reader["read" + type]();
        }
        return message;
    }
}
exports.GrpcService = GrpcService;

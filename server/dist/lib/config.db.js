"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let cachedConnection = null;
function ConnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedConnection) {
            console.log("Using cached db connection");
            return cachedConnection;
        }
        try {
            const cnx = yield mongoose_1.default.connect(process.env.MONGODB_URI);
            cachedConnection = cnx.connection;
            console.log("New mongodb connection established");
            return cachedConnection;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.ConnectDB = ConnectDB;

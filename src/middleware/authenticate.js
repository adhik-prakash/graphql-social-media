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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const graphql_1 = require("graphql");
const authenticate = (bearerToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = bearerToken.split("Bearer ")[1];
        if (token) {
            try {
                const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
                //console.log(user);
                if (user) {
                    return {
                        user,
                        token,
                    };
                }
                throw new graphql_1.GraphQLError("User not found", {
                    extensions: {
                        code: "UNAUTHORIZED",
                        http: { status: 402 },
                    },
                });
            }
            catch (error) {
                throw new Error("Invalid or Expired token");
            }
        }
        else {
            throw new Error("Authorization token must be 'Bearer token'");
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.authenticate = authenticate;

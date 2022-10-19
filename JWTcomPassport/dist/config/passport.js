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
exports.privateRoute = exports.generateToken = void 0;
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
dotenv_1.default.config();
const notAuthorizedJson = { status: 401, message: 'Não autorizado' };
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
passport_1.default.use(new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findByPk(payload.id);
    if (user) {
        return done(null, user);
    }
    else {
        return done(notAuthorizedJson, false);
    }
})));
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET);
};
exports.generateToken = generateToken;
const privateRoute = (req, res, next) => {
    passport_1.default.authenticate('jwt', (err, user) => {
        req.user = user;
        return user ? next() : next(notAuthorizedJson);
    })(req, res, next);
};
exports.privateRoute = privateRoute;
exports.default = passport_1.default;

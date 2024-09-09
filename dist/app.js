"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = require("./app/middlewares/notFound");
const globalErrorHandeler_1 = require("./app/middlewares/globalErrorHandeler");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello Cars Washing System!!!');
});
app.use(globalErrorHandeler_1.globalErrorHandler);
//Not found
app.use(notFound_1.notFound);
exports.default = app;

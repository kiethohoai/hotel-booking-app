"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const path_1 = __importDefault(require("path"));
/* DB Connect */
mongoose_1.default.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    console.log('🚀Database Connected');
    console.log('🚀ENV:', process.env.NODE_ENV);
});
/* App */
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FONTEND_URL,
    credentials: true,
}));
/* Static Files */
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
/* App Routes */
app.use(`/api/users`, users_1.default);
app.use(`/api/auth`, auth_1.default);
/* App Run */
app.listen(7000, () => {
    console.log(`🚀Server Running LocalHost:7000`);
});

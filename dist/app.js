"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const expressFileUpload = require("express-fileupload");
const cors = require("cors");
const http_1 = require("http");
const socket = require("socket.io");
class App {
    constructor() {
        this.routePrv = new routes_1.Routes();
        this.app = express();
        this.server = new http_1.Server(this.app);
        this.io = socket(this.server);
        this.config();
        this.routePrv.route(this.app);
    }
    config() {
        this.app.use(expressFileUpload());
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App();
//# sourceMappingURL=app.js.map
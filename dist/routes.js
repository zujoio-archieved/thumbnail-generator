"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_controller_1 = require("./controllers/file.controller");
class Routes {
    constructor() {
        this.fileController = new file_controller_1.FileController();
    }
    route(app) {
        app.route('/upload')
            .post(this.fileController.fileUpload); //http file upload
        app.route('/')
            .get(this.fileController.test);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map
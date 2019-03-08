"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
let uploadPath = path_1.join(__dirname, '../public/files');
class FileController {
    constructor() {
        //http file upload
        this.fileUpload = (req, res) => {
            let uploadFile = req.files.file;
            let fileName = uploadFile.name;
            console.log(uploadFile);
            uploadFile.mv(`${uploadPath}/${fileName}`, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                ;
                res.json({
                    file: `public/${fileName}`
                });
            });
        };
        this.test = (req, res) => {
            res.send('<h1>Worked</h1>');
        };
    }
}
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map
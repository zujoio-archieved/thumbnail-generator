"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const fs_1 = require("fs");
const path_1 = require("path");
const thumbnail_1 = require("./thumbnail");
let jpgpath = path_1.join(__dirname, "../public/files/jpg");
let tempPath = path_1.join(__dirname, "../public/files/temp");
class GenerateThumbnail {
    constructor() {
        this.io = app_1.default.io;
        this.files = {};
        this.io.on("connection", socket => {
            console.log("User connected");
            socket.on("START", (file) => {
                var fileName = file.name;
                let dimensions = file.dimensions;
                this.files[fileName] = {
                    fileSize: file.size,
                    data: "",
                    Height: dimensions.clientHeight,
                    width: dimensions.clientWidth,
                    downloaded: 0
                };
                let place = 0;
                try {
                    let stat = fs_1.statSync(`${tempPath}/${fileName}`);
                    if (stat.isFile()) {
                        this.files[fileName]["downloaded"] = stat.size;
                        place = stat.size / 524288;
                    }
                }
                catch (err) { }
                fs_1.open(`${tempPath}/${fileName}`, "a", 0o755, (err, fd) => {
                    if (err)
                        return console.log(err);
                    this.files[fileName]["handler"] = fd;
                    socket.emit("MORE_DATA", { place, percent: 0 });
                });
            });
            socket.on("UPLOAD", (file) => {
                let fileName = file.name;
                this.files[fileName]["downloaded"] += file.data.length;
                this.files[fileName]["data"] += file.data;
                if (this.files[fileName]["downloaded"] == this.files[fileName]["fileSize"]) {
                    fs_1.write(this.files[fileName]["handler"], this.files[fileName]["data"], null, "Binary", (err, written) => {
                        var ImgWidth = parseInt(this.files[fileName].width);
                        var ImgHeight = parseInt(this.files[fileName].Height);
                        thumbnail_1.ScaleThumb(`${tempPath}/${fileName}`, `${jpgpath}/${fileName}`, `${'.jpg'}`, ImgWidth, ImgHeight, 0.02);
                    });
                }
                else if (this.files[fileName]["data"].length > 10485760) {
                    fs_1.write(this.files[fileName]["handler"], this.files[fileName]["data"], null, "Binary", (err, written) => {
                        this.files[fileName]["data"] = "";
                        let place = this.files[fileName]["downloaded"] / 524288;
                        let percent = (this.files[fileName]["downloaded"] /
                            this.files[fileName]["fileSize"]) *
                            100;
                        socket.emit("MORE_DATA", { place, percent });
                    });
                }
                else {
                    let place = this.files[fileName]["downloaded"] / 524288;
                    let percent = (this.files[fileName]["downloaded"] /
                        this.files[fileName]["fileSize"]) *
                        100;
                    socket.emit("MORE_DATA", { place, percent });
                }
            });
            socket.on("cancel", async (data) => {
                console.log(data);
                let count = 0;
                try {
                    await data.files.forEach((fileName) => {
                        let stat = fs_1.statSync(`${this.uploadPath}/${fileName}`);
                        if (stat.isFile()) {
                            fs_1.unlink(`${this.uploadPath}/${fileName}`, () => {
                                console.log("in --", count);
                                count = count + 1;
                            });
                        }
                    });
                    console.log("cancel done", count);
                }
                catch (e) {
                    console.log(e);
                }
                socket.emit("cancel-done", { count });
            });
            socket.on("disconnect", () => {
                console.log("user disconnected");
            });
        });
    }
}
exports.GenerateThumbnail = GenerateThumbnail;
//# sourceMappingURL=file.sockethandler.js.map
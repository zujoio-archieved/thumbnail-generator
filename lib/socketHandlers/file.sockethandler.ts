import app from "../app";
import { Socket } from "socket.io";
import { statSync, open, write, createReadStream, createWriteStream, unlink } from "fs";
import { join } from "path";
import { cropthumbCoor, ScaleThumb, generateThumb, Resize,generateThumbwithsize } from './thumbnail';

let jpgpath = join(__dirname, "../public/files/jpg");

let tempPath = join(__dirname, "../public/files/temp");

export class GenerateThumbnail {
  private io = app.io;
  private files: Object = {};
  public uploadPath: string;

  public jpgpath: string;

  constructor() {
    this.io.on("connection", socket => {
      console.log("User connected");
      socket.on("START", (file: any) => {
        var fileName = file.name;
        let dimensions = file.dimensions;
        this.files[fileName] = {
          fileSize: file.size,
          data: "",
          Height: dimensions.clientHeight,
          width: dimensions.clientWidth,
          downloaded: 0
        };
        let place: number = 0;
        try {
          let stat = statSync(`${tempPath}/${fileName}`);
          if (stat.isFile()) {
            this.files[fileName]["downloaded"] = stat.size;
            place = stat.size / 524288;
          }
        } catch (err) { }
        open(`${tempPath}/${fileName}`, "a", 0o755, (err, fd) => {
          if (err) return console.log(err);
          this.files[fileName]["handler"] = fd;
          socket.emit("MORE_DATA", { place, percent: 0 });
        });
      });
      socket.on("UPLOAD", (file: any) => {
        let fileName = file.name;
        this.files[fileName]["downloaded"] += file.data.length;
        this.files[fileName]["data"] += file.data;
        if (this.files[fileName]["downloaded"] == this.files[fileName]["fileSize"]) {
          write(this.files[fileName]["handler"],this.files[fileName]["data"],null,"Binary",
           (err, written) => {
            var ImgWidth = parseInt(this.files[fileName].width);
            var ImgHeight = parseInt(this.files[fileName].Height);
               ScaleThumb(`${tempPath}/${fileName}`, `${jpgpath}/${fileName}`, `${'.jpg'}`, ImgWidth, ImgHeight, 0.02)
            }
          );
        }
         else if (this.files[fileName]["data"].length > 10485760) {
            write(this.files[fileName]["handler"],this.files[fileName]["data"],
            null,
            "Binary",
            (err, written) => {
              this.files[fileName]["data"] = "";

              let place = this.files[fileName]["downloaded"] / 524288;
              let percent =
                (this.files[fileName]["downloaded"] /
                  this.files[fileName]["fileSize"]) *
                100;
              socket.emit("MORE_DATA", { place, percent });
            }
          );
        }
        else
         {
          let place = this.files[fileName]["downloaded"] / 524288;
          let percent =
            (this.files[fileName]["downloaded"] /
              this.files[fileName]["fileSize"]) *
            100;
          socket.emit("MORE_DATA", { place, percent });
        }
      });
      socket.on("cancel", async (data: any) => {
        console.log(data);
        let count: number = 0;
        try {
            await data.files.forEach((fileName: string) => {
            let stat = statSync(`${this.uploadPath}/${fileName}`);
            if (stat.isFile())
            {
              unlink(`${this.uploadPath}/${fileName}`, () => {
                console.log("in --", count);
                count = count + 1;
              });
            }
          });
          console.log("cancel done", count);
        } catch (e) {
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

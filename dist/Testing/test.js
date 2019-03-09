"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const chai_1 = require("chai");
const fs_1 = require("fs");
const thumbnail_1 = require("../socketHandlers/thumbnail");
const path_1 = require("path");
const mocha_1 = require("mocha");
const path_2 = require("path");
let socket = null, emit = true;
let socketUrl = 'http://localhost:3000/';
let socketOptions = {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket']
};
var fileName;
let jpgpath = path_2.join(__dirname, './Upload');
let filedir = path_2.join(__dirname, './xyz.jpg');
console.log(jpgpath);
mocha_1.describe('Connected', () => {
    beforeEach((done) => {
        socket = socket_io_client_1.connect(socketUrl, socketOptions);
        socket.on('connect', () => {
            console.log('conncted to server');
        });
        done(null);
    });
    mocha_1.it('file Resize', async () => {
        await thumbnail_1.Resize(filedir, `${jpgpath}/${fileName}`, `${".jpg"}`, 500, 500);
        chai_1.expect('/home/mayankpandav/ZUJO/TASK/server/dist/Testing/Upload/undefined').to.equal(`${jpgpath}/${fileName}`);
        await fs_1.unlink(path_1.resolve(__dirname, `./Upload/undefined.jpg`), () => {
            console.log('File Deleted');
        });
    });
    mocha_1.it('file cropthumbCoor', async () => {
        await thumbnail_1.cropthumbCoor(filedir, `${jpgpath}/${fileName}`, `${".jpg"}`, 1, 1, 1, 1);
        chai_1.expect('/home/mayankpandav/ZUJO/TASK/server/dist/Testing/Upload/undefined').to.equal(`${jpgpath}/${fileName}`);
        await fs_1.unlink(path_1.resolve(__dirname, `./Upload/undefined.jpg`), () => {
            console.log('File Deleted');
        });
    });
    mocha_1.it('file ScaleThumb', async () => {
        await thumbnail_1.ScaleThumb(filedir, `${jpgpath}/${fileName}`, `${".jpg"}`, 500, 500, 0.1);
        chai_1.expect('/home/mayankpandav/ZUJO/TASK/server/dist/Testing/Upload/undefined').to.equal(`${jpgpath}/${fileName}`);
        await fs_1.unlink(path_1.resolve(__dirname, `./Upload/undefined.jpg`), () => {
            console.log('File Deleted');
        });
    });
    mocha_1.it('file generateThumbwithsize', async () => {
        await thumbnail_1.generateThumbwithsize(filedir, `${jpgpath}/${fileName}`, 500, `${".jpg"}`);
        chai_1.expect('/home/mayankpandav/ZUJO/TASK/server/dist/Testing/Upload/undefined').to.equal(`${jpgpath}/${fileName}`);
        await fs_1.unlink(path_1.resolve(__dirname, `./Upload/undefined.jpg`), () => {
            console.log('File Deleted');
        });
    });
    mocha_1.it('file generateThumb', async () => {
        await thumbnail_1.generateThumb(filedir, `${jpgpath}/${fileName}`, `${".jpg"}`);
        chai_1.expect('/home/mayankpandav/ZUJO/TASK/server/dist/Testing/Upload/undefined').to.equal(`${jpgpath}/${fileName}`);
        await fs_1.unlink(path_1.resolve(__dirname, `./Upload/undefined.jpg`), () => {
            console.log('File Deleted');
        });
    });
});
// new Promise((resolve, reject) => {
//     return reject('Error reason!');
//   }).then(null, () => {  
// });
// socket.on('START', socket => {
//     console.log("workibng")
// })
// socket.emit('UPLOAD',({name:fileName}) =>{
// });  
// socket.on('UPLOAD', (file: any) => {
//     console.log("adf");
// })
// socket.emit('UPLOAD', (file: any) => {
// });
// it('File upload', (done) => {
//     socket.emit('START', { name: fileName });
//     socket.on('MORE_DATA', (data) => {
//         emit && moreData(data);
//     })
//     const moreData = (data) => {
//         console.log(data);
//     }
//    done()
//     socket.on('DONE', (data)=>{
//         console.log('Upload complete', data);
//         expect(data.thumb).to.equal(0);
//         unlink(resolve(__dirname, `../../public/files/${fileName}`), () =>{
//             console.log('File Deleted')
//             setTimeout(done, 2000);
//         })
//     })
// })
//# sourceMappingURL=test.js.map
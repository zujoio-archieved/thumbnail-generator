"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const thumbnail_1 = require("../socketHandlers/thumbnail");
const mocha_1 = require("mocha");
const path_1 = require("path");
let socket = null, emit = true;
let socketUrl = 'http://localhost:3000/';
let socketOptions = {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket']
};
var fileName;
let mypath = path_1.join(__dirname, './Upload');
// let filePath = resolve(__dirname, `./Upload/${fileName}`);
mocha_1.describe('Connected', () => {
    beforeEach((done) => {
        socket = socket_io_client_1.connect(socketUrl, socketOptions);
        socket.on('connect', () => {
            console.log('conncted to server');
        });
        done(null);
    });
    mocha_1.it('file Resize', (done) => {
        // let filepath = 'https://www.google.com/photos/about/static/images/google.svg';
        let filePath = "./test.jpg";
        let jpgpath = path_1.join(__dirname, './Upload');
        thumbnail_1.ScaleThumb(filePath, `${jpgpath}/${fileName}`, `${'.png'}`, 500, 500, 0.1);
        done();
    });
});
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const chai_1 = require("chai");
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
//let mypath = join(__dirname, './Upload');
let filePath = "./test.jpg";
let jpgpath = path_1.join(__dirname, './Upload');
mocha_1.describe('Connected', () => {
    beforeEach((done) => {
        socket = socket_io_client_1.connect(socketUrl, socketOptions);
        socket.on('connect', () => {
            console.log('conncted to server');
        });
        done(null);
    });
    mocha_1.it('file Resize', (done) => {
        const resolvingPromise = new Promise((resolve) => {
            resolve('promise resolved');
        });
        resolvingPromise.then((result) => {
            chai_1.expect(result).to.equal('promise resolved');
        });
        // cropthumbCoor(filePath,`${jpgpath}/${fileName}`,`${'.png'}`,20,20,200,200)
        // new Promise((resolve, reject) => {
        //         return reject('Error reason!');
        //       }).then(null, () => {  console.log("pass")
        //     });
        done();
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
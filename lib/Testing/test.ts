import { connect } from 'socket.io-client';
import { expect } from 'chai';
import { readFile, unlink } from 'fs';
import { Resize, ScaleThumb, cropthumbCoor, generateThumb, generateThumbwithsize } from '../socketHandlers/thumbnail';
import { resolve } from 'path';
import { describe, it } from 'mocha';
import { join } from 'path';
let socket = null, emit = true;
let socketUrl = 'http://localhost:3000/';
let socketOptions = {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket']
}
var fileName: String;
let mypath = join(__dirname, './Upload');
// let filePath = resolve(__dirname, `./Upload/${fileName}`);
describe('Connected', () => {
    beforeEach((done) => {
        socket = connect(socketUrl, socketOptions);
        socket.on('connect', () => {
            console.log('conncted to server');
        })
        done(null);
    })
     it('file Resize', (done) => {
       // let filepath = 'https://www.google.com/photos/about/static/images/google.svg';
       let filePath = "./test.jpg";
        let jpgpath = join(__dirname, './Upload');
        ScaleThumb(filePath, `${jpgpath}/${fileName}`, `${'.png'}`, 500, 500, 0.1);
        done()
    })
})


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
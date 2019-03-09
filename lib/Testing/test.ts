import { connect } from 'socket.io-client';
import { expect,should } from 'chai';

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

let jpgpath = join(__dirname, './Upload');
let filedir = join(__dirname, './xyz.jpg');
console.log(jpgpath)
describe('Connected', () => {
    beforeEach((done) => {
        socket = connect(socketUrl, socketOptions);
        socket.on('connect', () => {
            console.log('conncted to server');
        })
        done(null);
    })
    it('file Resize', async () => {
        await Resize(filedir,`${jpgpath}/${fileName}`,`${".jpg"}`,500,500);
        expect('/home/mayankpandav/ZUJO/TASK/server/dist/Testing/Upload/undefined').to.equal(`${jpgpath}/${fileName}`);
       await unlink(resolve(__dirname, `./Upload/undefined.jpg`), () =>{
        console.log('File Deleted')
        })
      
     });
     it('file cropthumbCoor', async () => {
        await cropthumbCoor(filedir,`${jpgpath}/${fileName}`,`${".jpg"}`,1,1,1,1);
        expect('/home/mayankpandav/ZUJO/TASK/server/dist/Testing/Upload/undefined').to.equal(`${jpgpath}/${fileName}`);
       await unlink(resolve(__dirname, `./Upload/undefined.jpg`), () =>{
        console.log('File Deleted')
        })
     });
     it('file ScaleThumb', async () => {
        await ScaleThumb(filedir,`${jpgpath}/${fileName}`,`${".jpg"}`,500,500,0.1);
        expect('/home/mayankpandav/ZUJO/TASK/server/dist/Testing/Upload/undefined').to.equal(`${jpgpath}/${fileName}`);
       await unlink(resolve(__dirname, `./Upload/undefined.jpg`), () =>{
        console.log('File Deleted')
        })
     });
     it('file generateThumbwithsize', async () => {
        await generateThumbwithsize(filedir,`${jpgpath}/${fileName}`,500,`${".jpg"}`);
        expect('/home/mayankpandav/ZUJO/TASK/server/dist/Testing/Upload/undefined').to.equal(`${jpgpath}/${fileName}`);
       await unlink(resolve(__dirname, `./Upload/undefined.jpg`), () =>{
        console.log('File Deleted')
        })
     });
     it('file generateThumb', async () => {
        await generateThumb(filedir,`${jpgpath}/${fileName}`,`${".jpg"}`);
        expect('/home/mayankpandav/ZUJO/TASK/server/dist/Testing/Upload/undefined').to.equal(`${jpgpath}/${fileName}`);
       await unlink(resolve(__dirname, `./Upload/undefined.jpg`), () =>{
        console.log('File Deleted')
        })
     });
    
})

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
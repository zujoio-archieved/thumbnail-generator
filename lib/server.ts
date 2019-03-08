import app from './app';
import { GenerateThumbnail } from './socketHandlers/file.sockethandler';

let port = 3000;
new GenerateThumbnail();

app.server.listen(port , ()=> console.log(`server is up ${port}`));
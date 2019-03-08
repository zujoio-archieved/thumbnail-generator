"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const file_sockethandler_1 = require("./socketHandlers/file.sockethandler");
let port = 3000;
new file_sockethandler_1.GenerateThumbnail();
app_1.default.server.listen(port, () => console.log(`server is up ${port}`));
//# sourceMappingURL=server.js.map
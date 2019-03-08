"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require("sharp");
var sizes = [650, 750, 850, 950, 1050];
/**
 * Multiple Resolution from one file....
 * @param source Soruce path of file
 * @param destination destination path of file
 * @param type type of image file e.g, (.jpg,.png..)
 */
exports.generateThumb = (source, destination, type) => {
    (async () => {
        for (var i = 0; i < sizes.length; i++) {
            await sharp(source)
                .resize(sizes[i])
                .max()
                .toFile(destination + Math.random() + "thumbnail" + sizes[i] + type)
                .then(async (data) => await console.log(data))
                .catch(err => console.log(err));
        }
    })();
};
/**
 * generate thumbnail with defining size
 * @param source Soruce path of file
 * @param destination destination path of file
 * @param sizes define size of width  in a pixel e.g,(500,600...)
 * @param type type of image file e.g, (.jpg,.png..)
 */
exports.generateThumbwithsize = (source, destination, sizes, type) => {
    (async () => {
        await sharp(source)
            .resize(sizes)
            .max()
            .toFile(destination + Math.random() + "generateThumbwithsize" + sizes + type)
            .then(async (data) => await console.log(data))
            .catch(err => console.log(err));
    })();
};
/**
 * generate thumbnail with scaling size e.g,(0.1,0.2..)
 * @param source Soruce path of file
 * @param destination destination path of file
 * @param type type of image file e.g, (.jpg,.png..)
 * @param width difine width of image in a pixel e.g(500,600..)
 * @param height difine height of image in a pixel e.g(500,600..)
 * @param ratio define ration of image e.g, (0.1,0.2..)
 */
exports.ScaleThumb = (source, destination, type, width, height, ratio) => {
    (async () => {
        const targetWidth = Math.ceil(width * ratio);
        const targetHeight = Math.ceil(height * ratio);
        await sharp(source)
            .resize(targetWidth, targetHeight)
            .toFile(destination + "ScaleThumb" + width + height + type)
            .then(async (data) => {
            await console.log(destination + "ScaleThumb" + width + height + type);
            console.log(data);
        })
            .catch(err => console.log(err));
    })();
};
/**
 * Crop thumbanail from coordinat e.g(top,left,width, height)
 * @param source Soruce path of file
 * @param destination destination path of file
 * @param type type of image file e.g, (.jpg,.png..)
 * @param top cropt thumbnail from top in a pixel e.g(100,50..)
 * @param left cropt thumbnail from left in a pixel e.g(100,50..)
 * @param width assign width of thumbnail e.g(100,50..)
 * @param height assign height of thumbnail e.g,(100,50..)
 */
exports.cropthumbCoor = (source, destination, type, top, left, width, height) => {
    (async () => {
        const image = await sharp(source);
        image
            .metadata()
            .then(metadata => {
            console.log("cropthumbCoor", metadata);
            return image
                .extract({ left, top, width, height })
                .toFile(destination + Math.random() + "Coordinatorcrop" + type);
        })
            .then(async (data) => {
            await console.log("cropthumbCoor", data);
        });
    })();
};
/**
 * Resize file with height and width
 * @param source Soruce path of file
 * @param destination destination path of file
 * @param type type of image file e.g, (.jpg,.png..)
 * @param height assign height of thumbnail e.g(100,50..)
 * @param width  assign width of thumbnail e.g,(100,50..)
 */
exports.Resize = (source, destination, type, height, width) => {
    (async () => {
        await sharp(source)
            .resize(width, height)
            .max()
            .toFile(destination + Math.random() + "Resize" + type)
            .then(async (data) => await console.log("Resize", data))
            .catch(err => console.log(err));
    })();
};
//# sourceMappingURL=thumbnail.js.map
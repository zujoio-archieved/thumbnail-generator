
## npm install @zujo/thumbnail-generator

thumbnail all the things

creates a queue of images and converts them asynchronously into thumbnails

## Features
 - Resize Image 
 - Scale Resize 
 - crop image
 - generate multiple resolution  of image
 

## Command - Lines And Usage
```javascript
npm install @zujo/thumbnail-generator
```
  

## API:collision:

  

```javascript

const { ScaleThumb,generateThumb,Resize,cropthumbCoor,generateThumbwithsize} = require("@zujo/thumbnail-generator");

```

  

#### Similar Requirement for the all functions

```javascript

const  filepath = "./test.jpg"

const  jpgpath = path.join(__dirname, './test');

const  fileName = String;

```

  
#### Usage

```javascript

generateThumb(source, destination  path, imagefileType)

generateThumb(

filepath,

`${jpgpath}/${fileName}`,

`${'.png'}`

)

  

```

```javascript

generateThumbwithsize(source, destination  path, sizes,type)

  

generateThumbwithsize(

filepath,

`${jpgpath}/${fileName}`,

500,

`${'.png'}`

)

  

```

  

```javascript

ScaleThumb(source, destination  path, type,current_image_width,current_image_height,ratio_with_floating_point)

  

ScaleThumb(

filepath,

`${jpgpath}/${fileName}`,

`${'.png'}`,

500,500,0.2)

```

  

```javascript

cropthumbCoor(source,destination  path,type,top,left,width,height)

  

cropthumbCoor(filepath,

`${jpgpath}/${fileName}`,

`${'.png'}`,

20,20,200,200)

```

  

```javascript

Resize(source,destination  path,type,height,width)

  

Resize(

filepath,

`${jpgpath}/${fileName}`,

`${'.png'}`,

500,500)

```

## installation
```javascript
npm install @zujo/thumbnail-generator 
```

## Authors and Acknowledgment
[Mayank Pandav](https://github.com/mayankpandav), [Arjun Kava](https://github.com/arjun-kava)

### Thanks And Credits

 [Akhil Ramani](https://github.com/akhilramani), [Chintan Rajpara](https://github.com/chintanrajpara)

  

## Organization
Copyright 2019 Made with  :heartbeat: By  [ZUJO](https://zujo.io/)
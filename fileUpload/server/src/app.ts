import express, {
    Request,
    Response,
    NextFunction,
} from 'express';
import logger from 'morgan'; // 写日志
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'; // 500
import createError from 'http-errors';
import cors from 'cors';
import path from 'path';
import fs from 'fs-extra';
// import multiparty from 'multiparty';
import {mergeChunks, TEMP_DIR} from "./utils"; //处理文件上传
// const PUBLIC_PATH = path.resolve(__dirname, 'public');
let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));

// app.post('/upload', async function (req: Request, res: Response, next: NextFunction) {
//     let form = new multiparty.Form();
//     form.parse(req, async (error: any, fields, files) => {
//         if(error) {
//             return next(error);
//         }
//         let filename = fields.filename[0];
//         let chunk = files.chunk[0];
//         await fs.move(chunk.path, path.resolve(PUBLIC_PATH, filename), {
//             overwrite: true
//         });
//         res.json({
//             success: true,
//             data: {
//                 filename,
//                 chunk
//             }
//         });
//     });
// });

app.post('/upload/:filename/:chunk_name', async function (req: Request, res: Response, _next:NextFunction) {
    let { filename, chunk_name } = req.params;
    let chunk_dir = path.resolve(TEMP_DIR, filename);
    let exist = await fs.pathExists(chunk_dir);
    if(!exist){
        await fs.mkdirs(chunk_dir);
    }
    let chunkFilePath = path.resolve(chunk_dir, chunk_name);
    // flags append 后面断点续传
    let ws = fs.createWriteStream(chunkFilePath, {
        start: 0,
        flags: 'a'
    });
    req.on('end', () => {
        ws.close();
        res.json({
            success: true
        });
    });
    req.pipe(ws);
});

app.post('/merge/:filename', async function (req: Request, res: Response, _next: NextFunction) {
    let { filename } = req.params;
    await mergeChunks(filename);
    res.json({
        success: true
    });
});

/**
     fields { filename: [ '家校盒子小程序.png' ] }
     files {
        chunk: [
            {
                fieldName: 'chunk',
                originalFilename: '家校盒子小程序.png',
                path: '/var/folders/tl/0jkjrsk900v2csc2z_f9ln500000gn/T/5okYHicsEOfsToXsHn_r6BXi.png',
                headers: [Object],
                size: 4213647
            }
        ]
    }
 */

app.use(function (_req: Request, _res: Response, next: NextFunction){
    next(createError(404));
});

app.use(function (error: any, _req: Request, res: Response, _next: NextFunction) {
    res.status(error.status || INTERNAL_SERVER_ERROR);
    res.json({
        success: false,
        error
    });
});

/**
 * 1.跨域传cookie Access-Control-Allow-Origin不能为* xhr.withCredential:include all:true
 * 2.传来的肯定是流
 * const ws = fs.createWriteStream('xxx');
 * req.pipe(ws);
 */

export default app;


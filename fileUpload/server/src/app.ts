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
// import fs from 'fs-extra';
import multiparty from 'multiparty'; //处理文件上传

let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));
app.post('/upload', async function (req: Request, res: Response, next: NextFunction) {
    let form = new multiparty.Form();
    form.parse(req, async (error: any, fields, files) => {
        if(error) {
            return next(error);
        }
        console.log('fields', fields);
        console.log('files', files);
        res.json({
            success: true,
            data: {}
        });
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

export default app;


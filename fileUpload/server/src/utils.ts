import path from 'path';
import fs, { WriteStream } from 'fs-extra';
const DEFAULT_SIZE = 10 * 1024;
export const TEMP_DIR = path.resolve(__dirname, 'temp');
/**
 * @param filename
 * @param size
 */
export const splitChunk = async (filename: string, size:number = DEFAULT_SIZE ) => {
    let filepath = path.resolve(__dirname, filename); // 分割文件的绝对路径
    const chunksDir = path.resolve(TEMP_DIR, filename); // 以文件名命名的临时目录,存放分割后的文件
    await fs.mkdirp(chunksDir); // 递归创建文件夹
    let content = await fs.readFile(filepath); // Buffer 是一个字节数组 一个字节8个bit
    let len = content.length;
    let i = 0, current = 0;
    while (current < len) {
        await fs.writeFile(
            path.resolve(chunksDir, filename + '-' + i),
            content.slice(current, current+size)
        );
        i++;
        current += size;
    }
}

/**
 * @param filename
 * @param size
 * 1.读取temp下2.jpg所以的文件，按照尾部index排序
 * 2.累加在一起，temp文件删除
 * 3.提高性能用流来实现，不要用readFile writeFile
 */
const PUBLIC_PATH = path.resolve(__dirname, 'public');
const pipeStream = (filePath: string, ws: WriteStream) => {
    return new Promise(function (resolve: Function, _reject: Function){
        let rs = fs.createReadStream(filePath); // 2.jpg-0
        rs.on('end', async function (){
            // rs.close();
            // await fs.unlink(filePath);
            resolve();
        });
        rs.pipe(ws);
    });
}
export const mergeChunks = async (filename: string, size: number = DEFAULT_SIZE) => {
    let filePath = path.resolve(PUBLIC_PATH, filename);
    let chunksDir = path.resolve(TEMP_DIR, filename);
    const chunkFiles = await fs.readdir(chunksDir);
    // 按文件后缀index升序排列
    chunkFiles.sort((a, b) => {
        return Number(a.split('-')[1]) - Number(b.split('-')[1]);
    });
    await Promise.all([chunkFiles.map((chunkFile,index)=>{
        return pipeStream(
            path.resolve(chunksDir,chunkFile),
            fs.createWriteStream(filePath, {
                start: index * size
            })
        );
    })]);
    // await fs.unlink(chunksDir);
}

mergeChunks('2.jpg');

// splitChunk('2.jpg');

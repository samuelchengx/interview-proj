import React, {ChangeEvent, useEffect, useState} from "react";
import {Row, Col, Input, Button, message} from 'antd';
import { request } from './utils';
interface Part {
    chunk: Blob;
    size: number;
    filename?: string;
    chunk_name?: string;
}
const SIZE = 10 * 1024 * 1024;
function createChunks(file: File): Part[] {
    let current = 0;
    let partList: Part[] = [];
    while (current < file.size){
        let chunk = file.slice(current, current + SIZE);
        partList.push({ chunk, size: chunk.size});
        current += SIZE;
    }
    return partList;
}

function  Upload() {
    let [currentFile, setCurrentFile] = useState<File>();
    let [objectURL, setObjectURL] = useState<string>('');
    let [hashPercent, setHashPercent] = useState<number>(0);
    let [partList,setPartList] = useState<Part[]>([]);
    useEffect(() => {
        if(!currentFile) return;
        // let objectURL = window.URL.createObjectURL(currentFile);
        // setObjectURL(objectURL);
        // return () => window.URL.revokeObjectURL(objectURL);
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setObjectURL(reader.result as string);
        });
        reader.readAsDataURL(currentFile);
    }, [currentFile]);
    function handleChange(event: ChangeEvent<HTMLInputElement>){
        let file:File = event.target.files![0];
        setCurrentFile(file);
    }
    function calcHash(partList: Part[]) {
       return  new Promise(function (resolve) {
           let worker = new Worker('/hash.js');
           worker.postMessage({
               partList
           });
           worker.onmessage = function (event) {
               let {
                   percent,
                   hash
               } = event.data;
               // console.log('percent', percent);
               setHashPercent(percent);
               if(hash){
                   resolve(hash);
               }
           }
       });
    }
    async function handleUpload() {
        if(!currentFile) {
            return message.error('尚未选择文件!');
        }
        if(!allowUpload(currentFile)){
            return message.error('不支持此类文件上传!');
        }
        // 分片上传
        let partList: Part[] = createChunks(currentFile);
        // 先计算对象哈希值 秒传的功能 通过webworker子进程计算hash
        let fileHash = await calcHash(partList);
        let lastDotIndex = currentFile.name.lastIndexOf('.');
        let extName = currentFile.name.slice(lastDotIndex);
        let filename = `${fileHash}${extName}`; //xxx.jpg
        partList = partList.map(({chunk, size}, index)=>({
            filename,
            chunk_name: `${filename}-${index}`,
            chunk,
            size
        }));
        setPartList(partList);
        await uploadParts(partList, filename);
        // return ;
        // const formData = new FormData();
        // formData.append('chunk', currentFile); // 添加文件, 字段名chunk
        // formData.append('filename', currentFile.name); // 添加文件名
        // let res = await request({
        //     url: "/upload",
        //     method: 'post',
        //     data: formData
        // });
        // message.info('上传成功!');
    }
    async function uploadParts(partList: Part[], filename: string) {
        let requests = createRequests(partList, filename);
        await Promise.all(requests);
        await request({
            url: "/merge",
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({filename})
        });
    }
    function createRequests(partList: Part[], filename: string) {
        return partList.map((part:Part)=> request({
            url: `/upload/${filename}/${part.chunk_name}`, // 请求URL地址
            method: "post", // 请求方法
            headers: {
                'Content-Type': 'application/octet-stream' // 字节流
            },
            data: part.chunk // 请求体
        }));
    }
    return <Row>
        <Col span={12}>
            <Input
                type='file'
                style={{width: 300}}
                onChange={handleChange}
            />
            <Button
                type="primary"
                onClick={handleUpload}
                style={{marginLeft: 10}}
            >
                上传
            </Button>
        </Col>
        <Col span={12}>
            {
                objectURL &&
                <img
                    src={objectURL}
                     style={{
                         width: 100
                     }}
                    alt=""/>
            }
        </Col>
    </Row>
}
function allowUpload(file: File){
    let validFileTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"];
    let isValidFileType = validFileTypes.includes(file.type);
    if(!isValidFileType){
        message.error('不支持此类文件上传!');
    };
    const isLessThan2G = (file.size/1024/1024/1024) <= 2;
    if(!isLessThan2G) {
        message.error('上传的文件不能超过2G!');
    }
    return isValidFileType && isLessThan2G;
}
// blob,二进制,流,arrayBuffer,Buffer

export default Upload;
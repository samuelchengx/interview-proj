import React, {ChangeEvent, useEffect, useState} from "react";
import {Row, Col, Input, Button, message} from 'antd';
import { request } from './utils';
interface Part {
    chunk: Blob;
    size: number;
}
const SIZE = 1024 * 1024;
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
       return  new Promise(function () {
           let worker = new Worker('/hash.js');
           worker.postMessage({
               partList
           });
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
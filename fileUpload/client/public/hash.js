self.importScripts('http://cdn.bootcss.com/spark-md5/3.0.0/spark-md5.js')
self.onmessage = async (event) => {
    let { partList } = event.data;
    const spark = new self.SparkMd5().ArrayBuffer;
    let percent = 0; //总体计算hash的百分比
    let perSize = 100/partList.length; // 每计算完part,相当于完成百分之几
    let buffers = Promise.all(partList.map(({thunk, size})=>{
        const reader = new FileReader();
        reader.readAsArrayBuffer(thunk);
        reader.onload = function (event) {
            percent += perSize;
            self.postMessage({
                percent: Number(percent.toFixed(2))
            });
            resolve(event.target.result);
        }
    }));
    buffers.forEach(buffer=>{
      spark.append(buffer);
    });
    self.postMessage({
        percent: 100,
        hash: spark.hash()
    });
    self.close();
}
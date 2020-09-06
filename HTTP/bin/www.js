#! /usr/bin/env node

// 可执行文件 增加命令行参数解析 process.argv
// 使用commander解析用户参数 @babel/node
// 1.启动一个服务

const program = require('commander');
const packageJson = require('./package.json');
const userOption = require('./config');
const { forEach } = require('../util');

program.name('zs');
program.usage('--option <value>');

const usages = [];
forEach(userOption, (option)=>{
    usages.push(option);
    program.option(option.option, option.description);
});
program.version(packageJson.version);
program.on('--help', () => {
    console.log('Usages:\r')
    usages.forEach(usage =>{
        console.log(`  `+usage);
    });
});

let userConfig = program.parse(process.argv); // 解析用户参数

let defaultConfig = {
    port: 8080,
    address: 'localhost',
    directory: process.cwd(),
    ...userConfig
};

console.log('defaultConfig', defaultConfig);
/*
* Author: Trankhuong
*
*/

//////* Vui Lòng Không Chỉnh Sửa Bên Trên */////

let axios = require('axios');
let fs = require('fs');

let cloud = {
  host: 'file.miniclouds.cn',
  port: 27777,
  mvusername: 'mini-ai',
  sysname: 'mini-ai',
  'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryuoHFA0U7s9C0KOZE'
};
let upload = file_stream=>require('axios').post(`https://${cloud.host}:${cloud.port}/file/upload`, {
  'isHttps': 'true',
  'file': file_stream,
}, {
  headers: cloud
});

exports.file = file=>upload(fs.createReadStream(file)).then(res=>{
  let json = JSON.parse(res.data);
  if (json.resCode != 1)throw'Đã Xảy Ra Lỗi!';
  
  return json.resData.fileUrl;
}).catch(err=>err.message || err);

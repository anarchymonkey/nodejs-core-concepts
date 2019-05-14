const fs = require('fs');
var http = require('http');
 let readData = fs.readFileSync('read.txt','utf8',(err,data)=>{
    console.log(data);
});


console.log(readData);

let writeData = fs.writeFileSync('write.txt',readData,(err,data)=>{
    console.log("the data has been successfully written");
});


/*newStreamData.on('data',(chunk)=>{
    console.log("new buffer :>");
    newWritableData.write(chunk);
    console.log(chunk);
});

we can use pipes instead*/



let server = http.createServer((req,res)=>{
    res.writeHead('200',{'Content-type' : 'text/plain'});
    let newStreamData = fs.createReadStream(__dirname + '/chunkofdata.txt','utf8');
    let newWritableData = fs.createWriteStream(__dirname +'/storedData.txt');
    newStreamData.on('data',(chunk)=>{
        console.log('successful');
        newWritableData.write(chunk);
        res.end(chunk);
    });
});

server.listen(3000,'127.0.0.1',(err)=>{
    if(err){
        throw err;
    }

    console.log('server running on 3000');

});

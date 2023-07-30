// importing http module
const http = require("http");

// creating a http server
const server = http.createServer((req,res)=>{
    if(req.url=='/'){
        // returning html when client hits home route
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1 style="color:blue;">Hello World</h1>');

    } else if(req.url=='/test'){
        // returning an error when client hits /test route
        res.writeHead(500,{'Content-Type':'application/json'});
        res.end(JSON.stringify({
            code: 500,
            remark: 'Internal server error',
            data: null
        }));

    } else {
        // returning a not found error when client hits any url other than above two
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({
            code: 404,
            remark: 'Not found',
            data: null
        }));

    }
})

// starting server on port 5000 of localhost
const port = 5000;
server.listen(port,()=>{
    console.log(`Server is running on http://localhost:${5000}`);
});
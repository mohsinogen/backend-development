// importing modules
const http = require("http");
const helper = require("./helper");
const url = require('url');

// creating a http server
const server = http.createServer((req, res) => {
  
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  if (req.url == "/") {
    // returning html when client hits home route
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        code: 200,
        remark: "success",
      })
    );
  } else if (req.url.includes("/users")) {
    try {
      if (req.method=="GET") {
        const data = helper.read("./data.json");

        const parsedUrl = url.parse(req.url,true);
        
        res.writeHead(200, { "Content-Type": "application/json" , });
        
        // checking if name is present in query parameter
        if(parsedUrl.query.name){
            const result = data.filter((item)=> item.name.toLowerCase().includes(parsedUrl.query.name.toLowerCase()));
            res.end(JSON.stringify(result));
        } else{
            res.end(JSON.stringify(data));
        }

      } else {
        // returning error if method is other than GET and POST
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            code: 405,
            remark: "method not allowed",
            data: null,
          })
        );
      }
    } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
            code: 500,
            remark: "Internal server error",
            data: null,
            error: e,
            })
        );
    }
  } else {
    // returning a not found error when client hits any url other than above two
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        code: 404,
        remark: "Not found",
        data: null,
      })
    );
  }
});

// starting server on port 5000 of localhost
const port = 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${5000}`);
});

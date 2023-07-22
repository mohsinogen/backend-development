// importing modules
const http = require("http");
const url = require("url");
const helper = require("./helper");

// creating a http server
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  if (req.url == "/") {
    // returning a success response when client hits home route
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        code: 200,
        remark: "success",
      })
    );
  } else if (req.url.includes("/users")) {
    // when client hits /users path
    try {
      // reading the stored data from file
      const storedData = helper.read();

      if (req.method == "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });

        // checking if name is present in query parameter
        const parsedUrl = url.parse(req.url, true);
        if (parsedUrl.query.name) {
          const result = storedData.filter((item) =>
            item.name.toLowerCase().includes(parsedUrl.query.name.toLowerCase())
          );
          res.end(JSON.stringify(result));
        } else {
          res.end(JSON.stringify(storedData));
        }
      } else if (req.method == "POST") {
        // reading data from rquest body
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          const { name, email } = JSON.parse(body);
          // updating the data
          const newUserID =
            storedData.length > 1
              ? storedData[storedData.length - 1]["id"] + 1
              : 1;
          const updatedData = [...storedData, { id: newUserID, name, email }];
          helper.write(updatedData);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              code: 200,
              remark: "User added successfully",
              data: null,
            })
          );
        });
      } else if (req.method == "PUT") {
        // reading data from rquest body
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          const { id, name, email } = JSON.parse(body);

          // searching and editing the particular user
          const userToEditIndex = storedData.findIndex(
            (item) => item.id === id
          );
          storedData[userToEditIndex] = {
            ...storedData[userToEditIndex],
            name,
            email,
          };

          helper.write(storedData);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              code: 200,
              remark: "User updated successfully",
              data: null,
            })
          );
        });
      } else if (req.method == "DELETE") {
        // accessing the user id from query
        const parsedUrl = url.parse(req.url, true);
        const userToDeleteIndex = storedData.findIndex(
          (item) => item.id === Number(parsedUrl.query.id)
        );

        res.writeHead(200, { "Content-Type": "application/json" });

        if (userToDeleteIndex != -1) {
          storedData.splice(userToDeleteIndex, 1);
          helper.write(storedData);

          res.end(
            JSON.stringify({
              code: 200,
              remark: "User deleted successfully",
              data: null,
            })
          );
        } else {
          res.end(
            JSON.stringify({
              code: 400,
              remark: "User not found",
              data: null,
            })
          );
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

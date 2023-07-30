import url from "url";
import {read,write} from "../helper.js";

const getUsers=(req, res)=>{
    const data = read();

    const parsedUrl = url.parse(req.url, true);

    res.writeHead(200, { "Content-Type": "application/json" });

    if (parsedUrl.query.name) {
      const result = data.filter((item) =>
        item.name.toLowerCase().includes(parsedUrl.query.name.toLowerCase())
      );
      res.end(
        JSON.stringify({
          code: 200,
          remark: "success",
          data: result,
        })
      );
    } else {
      res.end(
        JSON.stringify({
          code: 200,
          remark: "success",
          data: data,
        })
      );
    }
}

const createUser=(req, res)=>{
    let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });

        req.on("end", () => {
          const parsedData = JSON.parse(data);
          const storedData = read();

          let updatedData = [];
          if (storedData.length >= 1) {
            console.log('in if');
            let newuserid = storedData[storedData.length - 1]["id"] + 1;
            updatedData = [
              ...storedData,
              {
                id: newuserid,
                name: parsedData.name,
                email: parsedData.email,
              },
            ];
          } else {
            console.log('in else');
            updatedData = [{
                id: 1,
                name: parsedData.name,
                email: parsedData.email,
            }]
          }
          write(updatedData);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              code: 200,
              remark: "User created",
              data: null,
            })
          );
        });
}

const updateUser=(req, res)=>{
    let data = "";

    req.on('data',(chunk)=>{
        data+=chunk;
    })
    req.on('end',()=>{
        const parsedData = JSON.parse(data);
        const {id, name, email} = parsedData;

        const storedData = read();

        const userToEditIndex = storedData.findIndex(item=> item.id===id);

        storedData[userToEditIndex] = {id, name, email};

        write(storedData);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              code: 200,
              remark: "User updated",
              data: null,
            })
          );

    })
}

const deleteUser=(req, res)=>{

    const paresedUrl = url.parse(req.url,true);

    if(paresedUrl.query.id){
        const storedData = read();

        const userToDeleteIndex = storedData.findIndex(item=> item.id == paresedUrl.query.id);

        storedData.splice(userToDeleteIndex,1);

        write(storedData);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            code: 200,
            remark: "User deleted",
            data: null,
          })
        );

    } else{
        res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              code: 400,
              remark: "User does't exist",
              data: null,
            })
          );
    }
}

export {getUsers, createUser, updateUser, deleteUser};
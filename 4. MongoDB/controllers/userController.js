// Importing modules
import url from "url";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const getUsers = asyncHandler(async (req, res) => {
  const storedData = await User.find();

  if (req.query.name) {
    const result = storedData.filter((item) =>
      item.name
        .toLocaleLowerCase()
        .includes(parsedUrl.query.name.toLocaleLowerCase())
    );
    res.json(result);
  } else {
    res.json(storedData);
  }
});
const createUser = (req, res) => {
  const { name, email } = req.body;

  if (name && email) {
    const storedData = read();

    const newUserID =
      storedData.length > 0 ? storedData[storedData.length - 1]["id"] + 1 : 1;
    const updatedData = [...storedData, { id: newUserID, name, email }];
    write(updatedData);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        code: 200,
        remark: "User added successfully",
        data: null,
      })
    );
  } else {
    res.status(400);
    res.json({
      code: 400,
      remark: "bad request",
    });
  }
};

const updateUser = (req, res) => {
  try {
    const { id, name, email } = req.body;

    if (id && name && email) {
      const storedData = read();

      // searching and editing the particular user
      const userToEditIndex = storedData.findIndex((item) => item.id === id);
      storedData[userToEditIndex] = {
        ...storedData[userToEditIndex],
        name,
        email,
      };

      write(storedData);
      res.json({
        code: 200,
        remark: "User updated successfully",
        data: null,
      });
    } else {
      res.status(400);
      res.json({
        code: 400,
        remark: "bad request",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      code: 500,
    });
  }
};

const deleteUser = (req, res) => {
  const storedData = read();

  const userToDeleteIndex = storedData.findIndex(
    (item) => item.id === Number(req.query.id)
  );

  if (userToDeleteIndex != -1) {
    storedData.splice(userToDeleteIndex, 1);
    write(storedData);

    res.json({
      code: 200,
      remark: "User deleted successfully",
      data: null,
    });
  } else {
    res.json({
      code: 400,
      remark: "User not found",
      data: null,
    });
  }
};

export { getUsers, createUser, updateUser, deleteUser };

const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Express.js Server!");
});

app.get("/api/users", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading file");
    } else {
      console.log(data);
      const users = JSON.parse(data);
      console.log(users);
      return res.send(users);
    }
  });
});

app.post("/api/create", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading file");
    } else {
      const users = JSON.parse(data).users;
      const newUser = { id: Date.now(), ...req.body };
      users.push(newUser);

      fs.writeFile("./db.json", JSON.stringify({ users }), (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error writing file");
        } else {
          return res.send("User added successfully");
        }
      });
    }
  });
});

app.put("/api/update/:id", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading file");
    } else {
      const users = JSON.parse(data).users;
      const updatedUsers = users.map((user) => {
        if (user.id == req.params.id) {
          return { ...user, ...req.body };
        } else {
          return user;
        }
      });
      // console.log("updatedUser", updatedUsers);
      fs.writeFile(
        "./db.json",
        JSON.stringify({ users: updatedUsers }),
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error writing file");
          } else {
            return res.send("User updated successfully");
          }
        }
      );
    }
  });
});

app.delete("/api/delete/:id", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading file");
    } else {
      const users = JSON.parse(data).users;
      const isUserFound = users.find((user) => user.id == req.params.id);
      if (!isUserFound) {
        return res.status(404).send("User not found");
      }

      const updatedUsers = users.filter((user) => user.id != req.params.id);
      // console.log("updatedUser", updatedUsers);
      fs.writeFile(
        "./db.json",
        JSON.stringify({ users: updatedUsers }),
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error writing file");
          } else {
            return res.send("User deleted successfully", req.params.id);
          }
        }
      );
    }
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

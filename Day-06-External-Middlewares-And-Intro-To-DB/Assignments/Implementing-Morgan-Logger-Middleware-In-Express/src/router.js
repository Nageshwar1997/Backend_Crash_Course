const express = require("express");
const fs = require("fs");
const router = express.Router();

const getUsers = () => {
  try {
    const data = fs.readFileSync("./src/db.json", "utf-8");
    const users = JSON.parse(data).users;
    return users;
  } catch (error) {
    console.error("Error reading user data:", error);
    return [];
  }
};

const writeUserFile = (usersData) => {
  try {
    fs.writeFileSync(
      "./src/db.json",
      JSON.stringify({ users: usersData }),
      "utf-8"
    );
    return true;
  } catch (error) {
    console.error("Error writing user data:", error);
    return false;
  }
};

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the Users Page");
});

router.get("/get-users", (req, res) => {
  const response = getUsers();
  if (Array.isArray(response) && response.length > 0) {
    return res.status(200).json({
      users: response,
    });
  } else if (Array.isArray(response) && response.length === 0) {
    return res.status(404).json({
      message: "No users found",
    });
  } else {
    return res.status(500).json({ error: "Failed to retrieve users" });
  }
});

router.post("/add-user", (req, res) => {
  const response = getUsers();
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }
  if (!password) {
    return res.status(400).send("Password is required");
  }

  const newUser = { id: Math.floor(Math.random() * 100), email, password };

  if (Array.isArray(response)) {
    response.push(newUser);
    if (writeUserFile(response)) {
      return res.status(201).send("User Created Successfully");
    } else {
      return res
        .status(500)
        .send("Failed to create User: Unable to write to file");
    }
  } else {
    return res
      .status(500)
      .json({ error: "Failed to retrieve users for creation" });
  }
});

router.put("/user/:id", (req, res) => {
  const response = getUsers();
  const { email, password } = req.body;
  const { id } = req.params;

  if (Array.isArray(response)) {
    const existingUserIndex = response.findIndex((user) => user.id == id);
    if (existingUserIndex === -1) {
      return res.status(404).send("User Not Found");
    }

    const updatedUser = {
      id: response[existingUserIndex].id,
      email: email || response[existingUserIndex].email,
      password: password || response[existingUserIndex].password,
    };

    response[existingUserIndex] = updatedUser;

    if (writeUserFile(response)) {
      return res.status(200).send("User updated successfully");
    } else {
      return res
        .status(500)
        .send("Failed to update user: Unable to write to file");
    }
  } else {
    return res
      .status(500)
      .json({ error: "Failed to retrieve users for update" });
  }
});

router.delete("/user/:id", (req, res) => {
  const response = getUsers();
  const { id } = req.params;

  if (Array.isArray(response)) {
    const existingUserIndex = response.findIndex((user) => user.id == id);
    if (existingUserIndex === -1) {
      return res.status(404).send("User Not Found");
    }

    const users = response.filter((user) => user.id != id);

    if (writeUserFile(users)) {
      return res.status(200).send("User deleted successfully");
    } else {
      return res
        .status(500)
        .send("Failed to delete user: Unable to write to file");
    }
  } else {
    return res
      .status(500)
      .json({ error: "Failed to retrieve users for deletion" });
  }
});

module.exports = router;

const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const data = await JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/create", async (req, res) => {
  try {
    const data = await JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    const { title, status } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    data.todos.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/update", async (req, res) => {
  try {
    const data = await JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    const todos = data.todos.map((todo) => {
      if (todo.id % 2 === 0) {
        return {
          ...todo,
          status: true,
        };
      } else {
        return todo;
      }
    });

    console.log("todos", todos);

    fs.writeFileSync("./db.json", JSON.stringify({ todos }));
    const updatedData = await JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    res.status(202).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const data = await JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    const todos = data.todos.filter((todo) => todo.status !== true);

    fs.writeFileSync("./db.json", JSON.stringify({ todos }));
    const updatedData = await JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    res.status(202).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

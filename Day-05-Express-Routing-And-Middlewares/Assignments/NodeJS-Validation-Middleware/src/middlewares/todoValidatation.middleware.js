const fs = require("fs");
const path = require("path");
const { isStringObject } = require("util/types");
const filePath = path.join(__dirname, "../errors/createTodo.errors.txt");

const todoValidationMiddleware = async (req, res, next) => {
  try {
    const { Name, Rating, Description, Genre, Cast } = req.body;
    const keys = ["Name", "Rating", "Description", "Genre", "Cast"];
    const ID = Math.floor(Math.random() * 1000) + 1;
    const reqBodyKeys = Object.keys(req.body);
    const errors = [];

    reqBodyKeys.forEach((key) => {
      if (!keys.includes(key)) {
        errors.push(
          `${key} is not a valid key, valid keys are ${keys.join(", ")}`
        );
      }
    });

    if (!ID || typeof ID !== "number") {
      errors.push("Please provide a valid ID type of ID must be a number");
    }

    if (!Name || typeof Name !== "string") {
      errors.push("Please provide a valid Name type of Name must be a string");
    }

    if (!Rating || typeof Rating !== "number") {
      errors.push(
        "Please provide a valid Rating type of Rating must be a number"
      );
    }

    if (
      !Description ||
      typeof Description !== "string" ||
      Description.length < 5
    ) {
      errors.push(
        "Please provide a valid Description type of Description must be a string and must be at least 5 characters long"
      );
    }

    if (!Genre || typeof Genre !== "string") {
      errors.push(
        "Please provide a valid Genre type of Genre must be a string"
      );
    }

    if (Cast.length === 0 || isStringObject(Cast)) {
      errors.push("Please provide a valid Cast type of Cast must be an array");
    }
    console.log(!Cast);

    if (Cast.length > 0) {
      Cast.forEach((cast, index) => {
        if (typeof cast !== "string") {
          errors.push(
            `Please provide a valid Cast type of Cast must be an array of strings, ${cast} is not a string at index ${index}`
          );
        } else if (cast.trim().length === 0) {
          errors.push(
            `Please provide a valid Cast type of Cast must be an array of strings, ${cast} is an empty string at index ${index}`
          );
        }
      });
    }

    if (errors.length > 0) {
      fs.writeFileSync(filePath, errors.join("\n"));

      const errorFile = fs.readFileSync(filePath, "utf-8").split("\n");
      return res.status(400).json({ error: errorFile });
    }

    req.body.ID = ID;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = todoValidationMiddleware;

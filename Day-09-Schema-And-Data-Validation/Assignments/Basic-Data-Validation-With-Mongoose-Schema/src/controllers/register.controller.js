const registerController = async (req, res) => {
  try {
    const { name, email, phone_number, age } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ errors: ["Name is required", `Key should be "name"`] });
    }
    if (name && (typeof name !== "string" || name.length < 3)) {
      return res
        .status(400)
        .json({ errors: { type: typeof name !== "string" ? "" : "" } });
    }
  } catch (error) {}
};

module.exports = registerController;

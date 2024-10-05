const ProfileModel = require("../models/profile.model");

const createUserProfileController = async (req, res) => {
  try {
    const { name, email, age, password, isMarried, gender } = req.body;

    const isUserProfileExist = await ProfileModel.findOne({ email });
    if (isUserProfileExist) {
      return res.status(409).json({ message: "User Profile already exists" });
    }
    // profile
    const userProfile = new ProfileModel({
      name,
      email,
      age,
      password,
      isMarried,
      gender,
    });
    const savedUserProfile = await userProfile.save();
    res.status(201).json({
      userProfile: savedUserProfile,
      message: "User Profile created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsersProfileController = async (req, res) => {
  try {
    const query = req.query;
    let usersProfiles = [];
    if (Object.keys(query).length > 0) {
      usersProfiles = await ProfileModel.find(query);
    } else {
      usersProfiles = await ProfileModel.find();
    }
    res
      .status(200)
      .json({ usersProfiles, message: "User Profiles fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleUserProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const userProfile = await ProfileModel.findById(id);

    if (!userProfile) {
      return res.status(404).json({ message: "User Profile not found" });
    }

    res
      .status(200)
      .json({ userProfile, message: "User Profile fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const userProfile = await ProfileModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!userProfile) {
      return res.status(404).json({ message: "User Profile not found" });
    }

    await userProfile.save();

    res
      .status(200)
      .json({ userProfile, message: "User Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUserProfileController = async (req, res) => {
  try {
    const { id } = req.params;

    const userProfile = await ProfileModel.findByIdAndDelete(id);

    if (!userProfile) {
      return res.status(404).json({ message: "User Profile not found" });
    }

    res.status(200).json({ message: "User Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUserProfileController,
  getAllUsersProfileController,
  getSingleUserProfileController,
  updateUserProfileController,
  deleteUserProfileController,
};

import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }

    const hasedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hasedPassword,
    });

    await newUser.save();
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, newUser.isAdmin, res);
    }
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.find({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Password is Invalid"));
    }

    const { password: pass, ...rest } = validUser._doc;

    generateTokenAndSetCookie(validUser._id, validUser.isAdmin, res);

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const { password, ...rest } = user._doc;
      generateTokenAndSetCookie(user._id, user.isAdmin, res);
      res.status(200).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePictureUrl: googlePhotoUrl,
      });
      await newUser.save();
      const { password, ...rest } = newUser._doc;
      generateTokenAndSetCookie(newUser._id, newUser.isAdmin, res);
      res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const signOut = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 0;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithOutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithOutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { username, password, email, profilePicture } = req.body;

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  if (password) {
    if (password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    password = bcryptjs.hashSync(password, 10);
  }

  if (username) {
    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username,
          email,
          profilePicture,
          password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export {
  signUp,
  signIn,
  google,
  signOut,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

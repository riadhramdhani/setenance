const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password ,profession} = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ errors: [{ msg: "user already exists" }] });
    }
    const user = new User({
      username,
      email,
      password,
      profession,
      
    });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    // generate token
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.secretkey, { expiresIn: "3d" });
    res.status(201).json({
      msg: "user created",
      user: { username: user.username, email: user.email,profession:user.profession, _id: user._id },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "bad credentials" }] });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ errors: [{ msg: "bad credentials" }] });
    }

    // generate token
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.secretkey, { expiresIn: "3d" });
    res.status(200).json({
      msg: "user connected with success",
      user: { username: user.username, email: user.email, _id: user._id },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.current = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean().exec();
    const { password, ...rest } = user;
    res.send(rest);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

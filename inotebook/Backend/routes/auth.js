const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SEC = "meet@9499";
router.post(
  "/createUser",
  body("name", "Enter valid name").isLength({ min: 3 }),
  body("email", "Enter valid email").isEmail(),
  body("password", "Enter valid password").isLength({ min: 5 }),
  async (req, res) => {
    // if thare are errors, return Bas request and the erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check wheather the user with this email axist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);

      const secPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
          profile:user,
        },
      };
      const authToken = jwt.sign(data, JWT_SEC);

      res.json({ authToken });
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  }
);

router.post(
  "/login",
  body("email", "Enter valid email").isEmail(),
  body("password", "Password can not be blank").exists(),
  async (req, res) => {
    let status = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({status:status,error: "Please try to login with correct credintials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({status:status, error: "Please try to login with correct credintials" });
      }

      const data = {
        user: {
          id: user.id,
          profile:user,
        },
      };
      const authToken = jwt.sign(data, JWT_SEC);

      res.json({status:true, authToken });
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  }
);

router.post("/getUser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;

const User = require("../../model/UserCredential");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
  console.log(req.body)
  const { nameOrmail, password } = req.body;
  if (!nameOrmail || !password) return res.sendStatus(401)
  
  console.log(nameOrmail, password)

  let foundUser;
  if (nameOrmail.includes("@"))
    foundUser = await User.findOne({ email: nameOrmail });
  else foundUser = await User.findOne({ username: nameOrmail });

  if (!foundUser) return res.sendStatus(401); //unauthorized

  const match = await bcrypt.compare(password, foundUser.password);
  console.log(match)

  if (match) { 
    // console.log(process.env.ACCESS_TOKEN_SECRET);
    
    const accessToken = jwt.sign(
      {
        username: foundUser.username,
      },
      'afdf543asg34r2f498af',
      { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      "faepwrfi2r948iferijg",
      { expiresIn: "1d" }
    );

    await User.updateOne({ _id: foundUser['_id'] }, { refreshToken: refreshToken }, { runValidators: true })
    
    res.cookie("jwt", refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.json({ accessToken, username:foundUser.username }); 
  }
  else {
    res.sendStatus(401); 
  } 
} 

module.exports = handleLogin;
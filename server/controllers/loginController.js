const User = require("../model/UserCredential");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  console.log(req.body)
  const { nameOrmail, password } = req.body;
  if(!nameOrmail || !password)return res.sendStatus(401)

  let foundUser;
  if (nameOrmail.includes("@"))
    foundUser = await User.findOne({ email: nameOrmail });
  else foundUser = await User.findOne({ username: nameOrmail });

  if (!foundUser) return res.sendStatus(401); //unauthorized

  const match = bcrypt.compare(password, foundUser.password);

  if (match) {
    
    const accessToken = jwt.sign(
      {
          username: foundUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      {
          username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    )

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
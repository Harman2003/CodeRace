const jwt = require('jsonwebtoken');
const UserDB = require('../model/UserCredential');

const refreshJWT = (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt) return res.status(401);

    const refreshToken = cookies.jwt;
    const foundUser = UserDB.find({ refreshToken: refreshToken });
    if (!foundUser) return res.sendStatus(403);
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if (err) return res.sendStatus(403);

            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15m'}
            )
            res.json({username:decoded.username,accessToken})
        }
    )
}

module.exports = refreshJWT;
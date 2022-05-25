const router = global["router"];
const jwt = require('jsonwebtoken');

router.verifyToken = function(req, res, next) {
    if (!req.headers["authorization"])
        return res.status(401).json({ msg: `No token, authorization denied` });
    else {
        const authHeader = req.headers["authorization"];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        const options = {algorithm: "HS256"};

        jwt.verify(token, process.env.SECRET, options, (err, verifiedJwt) => {
            if (err)
                return res.status(401).json({ msg: `Token is not valid` });
            next();
        });
    }
}

module.exports = router;
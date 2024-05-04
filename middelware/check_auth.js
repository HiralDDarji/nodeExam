const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
    let authorizationHeader = req.get('Authorization');
    if (!authorizationHeader) {
        return res.status(401).json({message: 'Please login to access specified module'});
    }
    let userToken = authorizationHeader.split(" ")[1];
    try {
        let decodedTokenDetails = jwt.verify(userToken, 'mysecrettoken');
        if (!decodedTokenDetails) {
            const error = new Error("Invalid Token");
            res.statusCode = 401;
            throw error;
        }
        req.userId = decodedTokenDetails.userId;
    } catch (error) {
        return res.status(500).json({message: 'Error While validating token'});
    }
    next();
});

module.exports = router;
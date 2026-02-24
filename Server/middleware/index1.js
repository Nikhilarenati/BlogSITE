const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) return res.status(401).send('Unauthorized');

    const token = tokenHeader.split(' ')[1];
    if (!token || token.length === 0) return res.status(401).send('Unauthorized');

    let decodedData;
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send('Invalid Token');
  }
};

module.exports = auth;

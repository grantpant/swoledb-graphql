import jwt from 'jsonwebtoken';

const verifyUser = (request) => {
  const requestAuth = request.request.headers.authorization;
  const token = requestAuth.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  return userId;
};

export default verifyUser;
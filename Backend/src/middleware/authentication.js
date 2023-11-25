import jwt from 'jsonwebtoken';
import {UserModel} from '../models/user.model.js'

const authMiddleware = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findOne({ _id: decoded.userId, 'tokens.token': token });
  
      if (!user) {
        throw new Error();
      }
  
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Autenticación requerida.' });
    }
  };
  
export {authMiddleware}
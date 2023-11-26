import jwt from 'jsonwebtoken';
import {UserModel} from '../models/user.model.js'
import {config} from '../setting/config.js'

const authMiddleware = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, config.jwtSecret);
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
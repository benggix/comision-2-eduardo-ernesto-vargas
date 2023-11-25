import jwt from 'jsonwebtoken';
import {config} from '../setting/config'
import {bcrypt} from 'bcrypt'
import {UserModel} from '../models/user.model'




// Controlador para el registro de usuarios
const registerUser = async (req, res) => {
    try {
      const { username, password, email, avatarURL } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new UserModel({
        username,
        password: hashedPassword,
        email,
        avatarURL,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
  };

// Controlador para el inicio de sesión de usuarios
const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }
  
      const token = jwt.sign({ userId: user._id }, config.jwtSecret);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  };


  

  
  
export {
    registerUser,
    loginUser,

  };
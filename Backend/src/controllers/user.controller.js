import jwt from 'jsonwebtoken';
import {config} from '../setting/config.js'
import bcrypt from 'bcrypt'
import {UserModel} from '../models/user.model.js'




// Controlador registrar los usuarios
const ctrlRegisterUser = async (req, res) => {
    try {
      const { username, password, email, avatarURL } = req.body;
  
      const newUser = new UserModel({
        username,
        password,
        email,
        avatarURL,
        tokens: [], // aca es donde guardaremos el token generado al registrar un usuario
      });
  
      await newUser.save();
      res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
  };

// Controlador para el inicio de sesion de los usuarios
const ctrlLoginUser = async (req, res) => {
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
      user.tokens.push({ token });

      await user.save();
      
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  };


  // Controlador para cerrar sesión de los usuarios
const ctrlLogoutUser = async (req, res) => {
  try {
      const { user } = req; // Asumiendo que la información del usuario está disponible en el objeto de solicitud (req.user)

      if (!user) {
          return res.status(401).json({ error: 'No autorizado.' });
      }

      // Eliminar el token actual de la lista de tokens del usuario
      user.tokens = user.tokens.filter(tokenObj => tokenObj.token !== req.token);

      await user.save();

      res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cerrar sesión.' });
  }
};

  
  
export {
    ctrlRegisterUser,
    ctrlLoginUser,
    ctrlLogoutUser,

  };
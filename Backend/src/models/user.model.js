import {Schema, model, Types} from "mongoose"
import jwt from 'jsonwebtoken';
import {bcrypt} from 'bcrypt'

const userSchema = new Schema ( {
    username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      avatarURL: {
        type: String,
      },
      tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
    });


// Hash de la contraseña antes de guardar en la base de datos
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

// Generar token de autenticación
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

export const UserModel = model("User", userSchema)

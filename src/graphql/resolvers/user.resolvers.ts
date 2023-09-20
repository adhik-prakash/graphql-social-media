import {
  InputUserInterface,
  LoginUserInterface,
} from "../../interface/userInterface";
import { User } from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userResolvers = {
  Query: {
    users: async () => {
      return await User.findAll();
    },
  },
  Mutation: {
    register: async (parents: any, args: { input: InputUserInterface }) => {
      const { userName, email, password, confirmPassword } = args.input;

      if (password !== confirmPassword) {
        throw new Error("Password donot match");
      }
      try {
        const checkEmail = await User.findOne({ where: { email: email } });

        if (checkEmail) {
          throw new Error("Email already exist");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser: any = await User.create({
          userName,
          email,
          password: hashedPassword,
        });
        return {
          id: newUser.id,
          userName: newUser.userName,
          email: newUser.email,
          message: "You have been registred succesfully",
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    login: async (parents: any, args: { input: LoginUserInterface }) => {
      const { email, password } = args.input;

      try {
        const userLogin = await User.findOne({ where: { email: email } });

        if (!userLogin) {
          throw new Error("This user is not registered yet");
        }
        const isValidPassword = await bcrypt.compare(
          password!.toString(),
          userLogin?.dataValues?.password
        );

        if (!isValidPassword) {
          throw new Error("Password you entered is incorrect");
        }

        const payload = {
          email: email,
          password: password,
          id: userLogin?.dataValues?.id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
          expiresIn: "1d",
        });

        // console.log(userLogin)
        return {
          ...userLogin.dataValues,
          token,
          message: "user login successfull",
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};

import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UserRepositories);

    // Verificar se email existe
    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    // verificar se senha está correta

    // 123456 / 783645734-sdhfhsdf7762374234234
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    // Gerar token
    const token = sign(
      {
        email: user.email,
      },
      "a1361cb85be840d6a2d762c68e4910e2",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };


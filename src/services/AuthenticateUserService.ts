import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import { UserRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
    email: string,
    password: string
}

class AuthenticateUserService{
    async execute({ email, password }: IAuthenticateRequest){
        const userRepositories = getCustomRepository(UserRepositories);
    
    //Verifica se email existe
    const user = await userRepositories.findOne({
        email
    });

    if(!user){
        throw new Error("Email/Password incorrect!");
    }

    //verifica se a senha está correta

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
        throw new Error("Email/Password incorrect!");
    }

    //Gerar token
    const token = sign({
        email: user.email
    },"a1361cb85be840d6a2d762c68e4910e2",{
        subject: user.id,
        expiresIn: "1d"
    });
    return token;
}

}

export { AuthenticateUserService };
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"

interface IAuthenticateRequest {
  email: string
  password: string
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({
      email
    })
    if (!user) {
      throw new Error("Email/password incorrect")
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new Error("Email/password incorrect")
    }

    const token = sign(
      {
        email: user.email,
        name: user.name
      },
      process.env.SECRET_JWT_TOKEN,
      {
        subject: user.id,
        expiresIn: "1d"
      }
    )

    return token;
  }
}

export { AuthenticateUserService }
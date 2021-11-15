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
      "2af55de45176b6e7402ac496f468585c",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    )

    return token;
  }
}

export { AuthenticateUserService }
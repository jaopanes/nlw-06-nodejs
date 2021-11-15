import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";
import HttpError from "../util/HttpError";

class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUsersService = new ListUsersService()

    const users = await listUsersService.execute()

    if (Array.isArray(users) && users.length === 0) {
      throw new HttpError("Nenhum usuário encontrado", 404)
    }

    return response.json(users)
  }
}

export { ListUsersController }
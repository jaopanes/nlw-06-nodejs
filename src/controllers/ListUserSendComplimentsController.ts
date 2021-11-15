import { Request, Response } from "express"
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService"
import HttpError from "../util/HttpError"

class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const listUserSendComplimentsService = new ListUserSendComplimentsService()

    const compliments = await listUserSendComplimentsService.execute(user_id)

    if (Array.isArray(compliments) && compliments.length === 0) {
      throw new HttpError("Nenhum elogio encontrado", 404)
    }

    return response.json(compliments)
  }
}

export { ListUserSendComplimentsController }
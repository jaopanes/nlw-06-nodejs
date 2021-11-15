import { Request, Response } from "express"
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService"
import HttpError from "../util/HttpError"

class ListUserReceiveComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService()

    const compliments = await listUserReceiveComplimentsService.execute(user_id)

    if (Array.isArray(compliments) && compliments.length === 0) {
      throw new HttpError("Nenhum elogio encontrado", 404)
    }

    return response.json(compliments)
  }
}

export { ListUserReceiveComplimentsController }
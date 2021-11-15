import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";
import HttpError from "../util/HttpError";

class ListTagsController {
  async handle(request: Request, response: Response) {
    const listTagsService = new ListTagsService()

    const tags = await listTagsService.execute()

    if (Array.isArray(tags) && tags.length === 0) {
      throw new HttpError("Nenhuma tag encontrada", 404)
    }

    return response.json(tags)
  }
}

export { ListTagsController }
import "reflect-metadata"
import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import "express-async-errors"

import { router } from "./routes"

import "./database"
import HttpError from "./util/HttpError"

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

interface IError {
  status?: number;
  message: string;
}

app.use((err: IError, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    return response.status(err.status).json({
      error: err.message
    })
  }

  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

app.listen(3000, () => console.log("Server is running"))
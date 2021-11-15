import { Router } from "express"

/**
 * Middlewares
 */
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"

/**
 * Controllers
 */
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateComplimentController } from "./controllers/CreateComplimentController"

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()

import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController"
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController"
import { ListTagsController } from "./controllers/ListTagsController"
import { ListUsersController } from "./controllers/ListUsersController"

const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController();

const router = Router()

router.post("/login", authenticateUserController.handle)

router.post("/users", ensureAuthenticated, ensureAdmin, createUserController.handle)
router.get("/users", ensureAuthenticated, listUsersController.handle)

router.post("/compliments", ensureAuthenticated, createComplimentController.handle)

router.get("/user/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle)
router.get("/user/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle)

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle)
router.get("/tags", ensureAuthenticated, listTagsController.handle)

export { router }
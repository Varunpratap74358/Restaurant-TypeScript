import express from 'express'
import { isAuthenticated } from '../middelwares/isAuthenticated'
import { addMenu, deleteMenu, editMenu } from '../controllers/menuController'
import upload from '../middelwares/multer'

const route = express.Router()

route.post("/",isAuthenticated,upload.single('image'),addMenu)
route.put("/:id",isAuthenticated,upload.single('image'),editMenu)
route.delete("/:id",isAuthenticated,deleteMenu)

export default route
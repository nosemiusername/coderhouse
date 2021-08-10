import { UserController } from '../controller/user.controller.js'
import { Router } from "express";

const webrouter = Router();

webrouter.post('/users', (req, res, next) => {
    UserController.create(req.body);
    res.render()
};
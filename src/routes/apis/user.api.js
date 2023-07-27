import express from "express";
const router = express.Router();

import userController from '../../controllers/user.controller';
import userMiddleware from "../../middlewares/user.middleware";
router.get('/', userMiddleware.getValidate, userController.getUsers);
router.post('/', userController.createUser);
router.delete('/:userId', userController.deleteUserById);
router.put('/:userId', userController.updateUserById);
router.patch('/:userId', userController.updateFieldUserById);
module.exports = router;
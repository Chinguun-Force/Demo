import { createOwner, updateOwner } from "../controller/owner";
import { Router } from "express";


const ownerRouter = Router();

ownerRouter
    .post('/', createOwner)
    .put('/:ownerId', updateOwner)

export { ownerRouter };
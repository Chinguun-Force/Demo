"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerRouter = void 0;
const owner_1 = require("../controller/owner");
const express_1 = require("express");
const ownerRouter = (0, express_1.Router)();
exports.ownerRouter = ownerRouter;
ownerRouter
    .post('/', owner_1.createOwner)
    .put('/:ownerId', owner_1.updateOwner);
//# sourceMappingURL=owner.js.map
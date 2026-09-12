// api/routes/api.js
import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
const router = Router();

import { expressjwt as jwt } from "express-jwt";
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
}).unless({
  path: [
    // javne poti (brez auth)
    "/register",
    "/login",
    "/matematika",
    /^\/items\/[^/]+$/,
    /^\/users\/[^/]+\/userRatings/,
    "/address",
    "/send-mail",
  ],
});

// Admin middleware
const requireAdmin = (req, res, next) => {
  console.log('requireAdmin called, req.auth:', req.auth);
  if (!req.auth) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  if (req.auth.type !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// DB access middleware
const requireDbAccess = (req, res, next) => {
  if (!req.auth) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  if (req.auth.type !== 'admin' && req.auth.type !== 'database-manager') {
    return res.status(403).json({ message: 'Database access required' });
  }
  next();
};

import ctrlItems from "../controllers/items.js";
import ctrlMatura from "../controllers/matura.js";


/* ============================================================
   MATEMATIKA
   ============================================================ */

// SNOVI
router.get("/matematika", ctrlItems.itemsList);
router.get("/items/:itemId", ctrlItems.itemsReadOne);
router.post("/items", ctrlItems.itemsCreate);
router.put("/items/:itemId", ctrlItems.itemsUpdateOne);
router.put("/items/:itemId/exchangeDate", ctrlItems.itemsUpdateExchangeDate);
router.delete("/items/:itemId", ctrlItems.itemsDeleteOne);

// MATURITETNE POLE
router.get("/matura", ctrlMatura.maturaList);
router.get("/matura/:maturaId", ctrlMatura.maturaReadOne);
router.get("/matura/:maturaId/naloge", ctrlMatura.nalogeList);
router.get("/matura/:maturaId/naloge/:nalogaId", ctrlMatura.nalogaReadOne);

export default router;
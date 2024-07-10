import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";

const route = Router();

export default function InitializeRoutes() {
  route.use("/auth", authRoutes.routes);
//   route.use("/user", userRoutes);
//   route.use("/media", mediaRoutes);
  
  return route; // Add this line to return the Router instance
}

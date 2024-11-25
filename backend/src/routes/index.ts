import { Router } from "express";
import { RideRoutes } from "./rides";
import { CustomersRoutes } from "./customers";

const Routes = Router();

// USE
Routes.use("/ride", RideRoutes);
Routes.use("/customer", CustomersRoutes);

export { Routes };

import { Router } from "express";
import { RideRoutes } from "./rides";
import { CustomersRoutes } from "./customers";
import { DriversRoutes } from "./drivers";

const Routes = Router();

// USE
Routes.use("/ride", RideRoutes);
Routes.use("/customer", CustomersRoutes);
Routes.use("/driver", DriversRoutes);

export { Routes };

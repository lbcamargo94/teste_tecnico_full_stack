import { GetDriversController } from "@controller/drivers/GetDriversController";
import { Router } from "express";

const DriversRoutes = Router();

const getDriversController = new GetDriversController();

DriversRoutes.get("/all_drivers", getDriversController.GetAllDrivers);

export { DriversRoutes };

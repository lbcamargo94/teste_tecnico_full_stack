import { CreateRidesController } from "@controller/rides/CreateRidesController";
import { GetRidesConstroller } from "@controller/rides/GetRidesController";
import { UpdateRidesController } from "@controller/rides/UpdateRidesController";
import { CreateRideMiddleware } from "@middleware/rides/CreateRideMiddleware";
import { UpdateRidesMiddleware } from "@middleware/rides/UpdateRideMiddleware";
import { Router } from "express";

const createRidesMiddleware = new CreateRideMiddleware();
const updateRidesMiddleware = new UpdateRidesMiddleware();

const createRidesController = new CreateRidesController();
const updateRidesController = new UpdateRidesController();
const getRidesConstroller = new GetRidesConstroller();

const RideRoutes = Router();

//GET
RideRoutes.get(
  "/:customer_id",
  getRidesConstroller.GetManyRidesFiltredByCustomerId,
);
// POST
RideRoutes.post(
  "/estimate",
  createRidesMiddleware.CreateRides,
  createRidesController.CreateRides,
);
// PATCH
RideRoutes.patch(
  "/confirm",
  updateRidesMiddleware.UpdateRides,
  updateRidesController.UpdateRides,
);
// PUT
// DELETE

export { RideRoutes };

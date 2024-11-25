import { CreateCustomerController } from "@controller/customers/CreateCustomerController";
import { CreateCustomerMiddleware } from "@middleware/customer/CreateCustomerMiddleware";
import { Router } from "express";

const CustomersRoutes = Router();

const createCustomerMiddleware = new CreateCustomerMiddleware();

const createCustomerController = new CreateCustomerController();

// USE
// GET
// POST
CustomersRoutes.post(
  "/create_customer",
  createCustomerMiddleware.CreateCustomers,
  createCustomerController.CreateCustomers,
);
// PATCH
// PUT
// DELETE

export { CustomersRoutes };

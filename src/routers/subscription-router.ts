import express, { Router } from "express";
import * as SubscriptionController from "../controllers/subscription-controller";
import { handleStandardError } from "../middlewares/handle-standard-error";
import { verifyToken } from "../middlewares/verify-token";

const subscriptionRouter: Router = express.Router();

subscriptionRouter.post(
    "/api/subscription",
    verifyToken,
    SubscriptionController.updateSubscription,
    handleStandardError,
);

subscriptionRouter.get(
    "/api/subscriptions",
    verifyToken,
    SubscriptionController.searchSubscription,
    handleStandardError,
);

export { subscriptionRouter };
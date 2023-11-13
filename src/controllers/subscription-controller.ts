import { NextFunction, Request, Response } from "express";
import * as SubscriptionService from "../services/subscription-service";
import {generateResponse} from "../utils/response";
import {StatusCodes} from "http-status-codes";
import SubscriptionStatus from "../type/subscription-status";

const soapUrl = process.env.SOAP_URL + "subscription";
const soapWSUrl = process.env.SOAP_WS_URL as string

const updateSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const data = req.body;
        const responseData = await SubscriptionService.updateSubscription(soapUrl, soapWSUrl, data);
        generateResponse(res, StatusCodes.OK, responseData);
    } catch (err) {
        next(err);
    }
}

const searchSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const responseData = await SubscriptionService.searchSubscription(soapUrl, soapWSUrl, {
            status: req.query.status as SubscriptionStatus,
            searchInput: req.query.searchInput as string ?? "",
            orderBy: req.query.orderBy as string ?? "",
            page: req.query.page ? Number(req.query.page) : 1,
            size: req.query.size ? Number(req.query.size) : 15,
        });
        generateResponse(res, StatusCodes.OK, responseData);
    } catch (err) {
        next(err);
    }
}

export {
    updateSubscription,
    searchSubscription,
}
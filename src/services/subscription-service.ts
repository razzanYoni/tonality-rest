import {soapHandler} from "../utils/soap-handler";
import SubscriptionStatus from "../type/subscription-status";
import {validate} from "../validation/validation";
import {searchSubscriptionSchema, updateSubscriptionSchema} from "../validation/subscription-validation";

const updateSubscription = async (
    url : string,
    ws_url : string,
    data : {
        userId: number;
        albumId: number;
        status: string;
    },
): Promise<object> => {
    validate(updateSubscriptionSchema, data)
    return soapHandler(url, ws_url, "updateSubscription", data)
};

const searchSubscription = async (
    url : string,
    ws_url : string,
    data : {
        status: SubscriptionStatus;
        searchInput?: string;
        orderBy?: string;
        size?: number;
        page?: number;
    },
): Promise<object> => {
    validate(searchSubscriptionSchema, data)
    return soapHandler(url, ws_url, "searchSubscription", data)
}

export {
    updateSubscription,
    searchSubscription,
}

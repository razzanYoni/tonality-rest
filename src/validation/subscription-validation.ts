import { z } from 'zod';

const updateSubscriptionSchema = z.object({
    userId: z.number().int().min(1),
    premiumAlbumId: z.number().int().min(1),
    status: z.string().min(1).max(255),
});

const searchSubscriptionSchema = z.object({
    status: z.optional(z.string().min(1).max(255)),
    searchInput: z.optional(z.string()),
    orderBy: z.optional(z.string()),
    page: z.number().int().min(1),
    size: z.number().int().min(1),
});

export {
    updateSubscriptionSchema,
    searchSubscriptionSchema,
}
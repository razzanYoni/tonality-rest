import { z } from "zod";

const createPremiumAlbumSchema = z.object({
    albumName: z.string().min(1).max(255),
    releaseDate: z.coerce.date(),
    genre: z.string().min(1).max(255),
    artist: z.string().min(1).max(255),
    coverFilename: z.string().min(1).max(255),
});

const searchPremiumAlbumSchema = z.object({
    size: z.optional(z.number().int().min(10).max(100)),
    page: z.optional(z.number().int().min(1)),
    searchQuery: z.optional(z.string().min(1).max(255)),
});

const updatePremiumAlbumSchema = z.object({
    premiumAlbumId: z.number().int().min(1),
    albumName: z.optional(z.string().min(1).max(255)),
    releaseDate: z.optional(z.coerce.date()),
    genre: z.optional(z.string().min(1).max(255)),
    artist: z.optional(z.string().min(1).max(255)),
    coverFilename: z.optional(z.string().min(1).max(255)),
});

const deletePremiumAlbumSchema = z.object({
    premiumAlbumId: z.number().int().min(1),
});

export {
    createPremiumAlbumSchema,
    searchPremiumAlbumSchema,
    updatePremiumAlbumSchema,
    deletePremiumAlbumSchema,
}
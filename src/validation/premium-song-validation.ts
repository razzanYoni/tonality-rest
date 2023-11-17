import { z } from "zod";

const addNewSongSchema = z.object({
    premiumAlbumId: z.number().int().min(1),
    title: z.string().min(1).max(255),
    artist: z.string().min(1).max(255),
    discNumber: z.optional(z.number().int().min(1)).nullable(),
    songNumber: z.optional(z.number().int().min(1)),
    duration: z.optional(z.number().int().min(1)),
});

const getAllSongFromAlbumSchema = z.object({
    premiumAlbumId: z.number().int().min(1),
});

const updatePremiumSongSchema = z.object({
    premiumAlbumId: z.number().int().min(1),
    premiumSongId: z.number().int().min(1),
    title: z.optional(z.string().min(1).max(255)),
    artist: z.optional(z.string().min(1).max(255)),
    discNumber: z.optional(z.number().int().min(1)).nullable(),
    songNumber: z.optional(z.number().int().min(1)),
    duration: z.optional(z.number().int().min(1)),
});

const deletePremiumSongSchema = z.object({
    premiumAlbumId: z.number().int().min(1),
    premiumSongId: z.number().int().min(1),
});

export {
    addNewSongSchema,
    getAllSongFromAlbumSchema,
    updatePremiumSongSchema,
    deletePremiumSongSchema,
}
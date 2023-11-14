import { z } from "zod";

const addNewSongSchema = z.object({
    albumId: z.number().int().min(1),
    title: z.string().min(1).max(255),
    artist: z.string().min(1).max(255),
    album: z.string().min(1).max(255),
    discNumber: z.optional(z.number().int().min(1)).nullable(),
    songNumber: z.optional(z.number().int().min(1)),
    duration: z.optional(z.number().int().min(1)),
    audioFilename: z.string().min(1).max(255),
});

const getAllSongFromAlbumSchema = z.object({
    albumId: z.number().int().min(1),
});

const updatePremiumSongSchema = z.object({
    albumId: z.number().int().min(1),
    songId: z.number().int().min(1),
    title: z.optional(z.string().min(1).max(255)),
    artist: z.optional(z.string().min(1).max(255)),
    album: z.optional(z.string().min(1).max(255)),
    discNumber: z.optional(z.number().int().min(1)).nullable(),
    songNumber: z.optional(z.number().int().min(1)),
    duration: z.optional(z.number().int().min(1)),
    audioFilename: z.optional(z.string().min(1).max(255)),
});

const deletePremiumSongSchema = z.object({
    albumId: z.number().int().min(1),
    songId: z.number().int().min(1),
});

export {
    addNewSongSchema,
    getAllSongFromAlbumSchema,
    updatePremiumSongSchema,
    deletePremiumSongSchema,
}
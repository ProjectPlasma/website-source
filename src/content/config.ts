import { defineCollection, z } from 'astro:content';

const news = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.date(),
        author: z.string(),
        image: z.string().optional(),
        summary: z.string().optional(),
    }),
});

export const collections = { news };

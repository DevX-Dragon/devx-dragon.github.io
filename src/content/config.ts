import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.enum(['Hardware', 'Software', 'IRL'])),
    images: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    date: z.string().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['done', 'wip', 'abandoned']).default('done'),
  }),
});

export const collections = { projects };

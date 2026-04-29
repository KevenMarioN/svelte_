import { form, getRequestEvent, query } from "$app/server";
import { auth } from "$lib/auth/auth";
import { db } from "$lib/server/db";
import { post } from "$lib/server/db/schema";
import { error, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import * as v from "valibot";

export const getAllPosts = query(async () => db.query.post.findMany({
    orderBy(fields, operators) {
        return operators.desc(fields.createdAt);
    },
}));

export const getPostByID = query(v.string(), async (id) => db.query.post.findFirst({
    where: (post, { eq }) => eq(post.id, id)
}));

export const getPostBySlug = query(v.string(), async (slug) => db.query.post.findFirst({
    where: (post, { eq }) => eq(post.slug, slug)
}));


export const createPost = form(v.object({
    title: v.pipe(v.string(), v.nonEmpty("Title is required")),
    content: v.pipe(v.string(), v.nonEmpty("Content is required")),
}), async ({ content, title }) => {
    const event = getRequestEvent();
    const session = await auth.api.getSession({
        headers: event.request.headers,
    });

    if (session?.user?.role !== 'admin') {
        error(401, 'Unauthorized');
    }

    const slug = title.toLowerCase().replace(/ /g, '-');

    await db.insert(post).values({
        title,
        content,
        slug,
        authorID: session.user.id
    });

    redirect(303, '/admin');
})

export const updatePost = form(v.object({
    id: v.pipe(v.string(), v.nonEmpty("ID is required")),
    title: v.pipe(v.string(), v.nonEmpty("Title is required")),
    content: v.pipe(v.string(), v.nonEmpty("Content is required")),
}), async ({ id, content, title }) => {
    const event = getRequestEvent();
    const session = await auth.api.getSession({
        headers: event.request.headers,
    });

    if (session?.user?.role !== 'admin') {
        error(401, 'Unauthorized');
    }

    const slug = title.toLowerCase().replace(/ /g, '-');

    await db.update(post).set({
        title,
        content,
        slug,
    }).where(eq(post.id, id));


    redirect(303, '/admin');
})
import "server-only";

import {db } from "./db"
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { images } from "./db/schema";
//import { revalidatePath, revalidateTag } from "next/cache";
//import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getMyImages() {

  const user = await auth();

if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, {eq }) => eq(model.userId, user.userId),
    orderBy: (model, {desc}) => desc(model.id),
  })
  return images;
} 

export async function getImage(id: number){
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq}) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");
 
  if (image.userId !== user.userId) throw new Error("Unauthorized");
  
    return image;
}

export async function deleteImage(id: number){
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and( eq(images.id, id), eq(images.userId, user.userId)));

  // await Promise.all([
  //   revalidateTag(`image-${id}`),
  //   revalidatePath("/", "layout"),
  //   fetch("/api/revalidate?secret=...", { method: "POST" })
  // ]);

    revalidatePath("/");
    redirect("/");
}
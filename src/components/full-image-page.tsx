import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "./ui/button";


export default async function FullPageImageView(props: {id: number}) {
  const idAsNumber = Number(props.id);
  
  const image = await getImage(idAsNumber)

  let uploaderInfo = ((await clerkClient()).users.getUser(image.userId)); 

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex-shrink flex justify-center items-center">
        <img src={image.url} className="object-contain flex-shrink"/>
      </div>

      <div className="w-48 flex flex-col flex-shrink-0 border-l">
        <div className="text-lg border-b text-center p-2">{image.name}</div>
        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <span>{(await uploaderInfo).fullName}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created on:</span>
          <span>{new Date((await uploaderInfo).createdAt).toLocaleDateString()}</span>
        </div>
        <div className="p-2">
          <form action={async ()=> {
            "use server";
            await deleteImage(idAsNumber)
          }}>
            <Button type="submit" variant="destructive">Delete</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
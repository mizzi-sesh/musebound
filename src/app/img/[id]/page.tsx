// import { Modal } from "./modal";

import { getImage } from "~/server/queries";
import { Modal } from "../../@modal/(.)img/[id]/modal";
import FullPageImageView from "~/components/full-image-page";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;

  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber)
  return <FullPageImageView id={idAsNumber}/>
}
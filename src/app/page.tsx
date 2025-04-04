import { headers } from "next/headers";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
	"https://8xbire1299.ufs.sh/f/E1KmIvdZupyKdfMBEgPHf3LQSkAtPcdY0pZOT6RIlnv79xG4",
	"https://8xbire1299.ufs.sh/f/E1KmIvdZupyKm3Rquvn9J4pWhaYU3SEXNq6bAcL8nm5voCjM",
	"https://8xbire1299.ufs.sh/f/E1KmIvdZupyKOziUka3VwRvkgnPcMdtfWY9T7NreEzXsU5mF",
	"https://8xbire1299.ufs.sh/f/E1KmIvdZupyKZU82UF6V4jRFUzdHsYKQ8wOMgufoSxayl39T"
];

const mockImages = mockUrls.map((url, index) => ({
	id: index + 1,
	url,
}));

export default async function HomePage() { 
	headers(); 
  const posts = await db.query.posts.findMany(); 

	console.log(posts);

	return (
		<main className="">
			<div className="flex flex-wrap gap-4">
				{posts.map((post) => (
					<div key={post.id}>{post.name}</div>
				))}
				{[...mockImages, ...mockImages, ...mockImages, ...mockImages].map((image, index) => (
					<div key={image.id + "-" + index} className="w-48"> 
						<img src={image.url}/>
          </div>
				))
      }
			</div>
		</main>
	);

}

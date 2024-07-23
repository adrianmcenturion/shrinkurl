import {notFound, permanentRedirect} from "next/navigation";
import {revalidatePath} from "next/cache";

import {getShortUrl, increaseCountVisits} from "./actions";

interface SlugProps {
  params: {slug: string};
}

export default async function SlugPage({params}: SlugProps) {
  const {slug} = params;

  const shortUrl = await getShortUrl(slug);

  if (!shortUrl) notFound();

  await increaseCountVisits(slug);

  revalidatePath("/dashboard");

  return permanentRedirect(shortUrl.target);
}

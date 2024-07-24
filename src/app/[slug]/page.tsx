import type {SlugProps} from "@/types";

import {notFound, permanentRedirect} from "next/navigation";

import {getShortUrl, increaseCountVisits} from "./actions";

export default async function SlugPage({params}: SlugProps) {
  const {slug} = params;

  const shortUrl = await getShortUrl(slug);

  if (!shortUrl) notFound();

  await increaseCountVisits(slug);

  return permanentRedirect(shortUrl.target);
}

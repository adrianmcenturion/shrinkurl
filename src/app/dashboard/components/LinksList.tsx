import type {LinkProps} from "@/components/LinkCard";
import type {PostgrestSingleResponse} from "@supabase/supabase-js";

import LinkCard from "@/components/LinkCard";

import {readLinks} from "../actions";

async function LinksList() {
  const data: PostgrestSingleResponse<LinkProps[]> = await readLinks();

  return (
    <div className="flex flex-col justify-center gap-1">
      {data.data!.map((d) => (
        <LinkCard
          key={d.id}
          alias={d.alias}
          id={d.id}
          short_url={d.short_url}
          target={d.target}
          visit_count={d.visit_count}
        />
      ))}
    </div>
  );
}

export default LinksList;

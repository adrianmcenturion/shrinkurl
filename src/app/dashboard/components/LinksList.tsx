"use client";

import type {LinkListProps} from "@/types";

import LinkCard from "@/components/LinkCard";
import {DataTable} from "@/components/Table/data-table";
import {columns} from "@/components/Table/columns";

function LinksList({data}: LinkListProps) {
  return (
    <div>
      <div className="flex flex-col justify-center gap-1 md:flex-row md:flex-wrap lg:hidden">
        {data!.map((d) => (
          <LinkCard
            key={d.id}
            alias={d.alias!}
            id={d.id!}
            short_url={d.short_url!}
            target={d.target}
            visit_count={d.visit_count!}
          />
        ))}
      </div>
      <div className="hidden lg:block">
        <DataTable columns={columns} data={data!} />
      </div>
    </div>
  );
}

export default LinksList;

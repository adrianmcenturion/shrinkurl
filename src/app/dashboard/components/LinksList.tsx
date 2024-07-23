"use client";

import type {Link} from "@/components/Table/columns";

import LinkCard from "@/components/LinkCard";
import {DataTable} from "@/components/Table/data-table";
import {columns} from "@/components/Table/columns";

interface LinkListProps {
  error?: unknown;
  count?: number;
  status?: unknown;
  statusText?: string;
  data: Link[] | null;
}

function LinksList({data}: LinkListProps) {
  return (
    <div>
      <div className="flex flex-col justify-center gap-1 lg:hidden">
        {data!.map((d) => (
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
      <div className="hidden lg:block">
        <DataTable columns={columns} data={data!} />
      </div>
    </div>
  );
}

export default LinksList;

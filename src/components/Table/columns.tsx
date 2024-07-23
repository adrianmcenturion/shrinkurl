"use client";

import type {ColumnDef} from "@tanstack/react-table";

import Link from "next/link";
import {ClipboardCopyIcon} from "@radix-ui/react-icons";

import {toast} from "../ui/use-toast";
import {Button} from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Link {
  id: number;
  short_url: string;
  alias: string;
  target: string;
  qrCode: string;
  visit_count: number;
  created_at: Date;
}

export const columns: ColumnDef<Link>[] = [
  {
    accessorKey: "alias",
    header: "Alias",
    cell: ({row}) => {
      return <div className="font-bold">{row.original.alias}</div>;
    },
  },
  {
    accessorKey: "short_url",
    header: "Link corto",
    cell: ({row}) => {
      const fullUrl = `${process.env.NEXT_PUBLIC_URL!}${row.original.short_url}`;

      const copyToClipboard = () => {
        navigator.clipboard.writeText(fullUrl);
        toast({
          title: "Copiado!",
          duration: 750,
        });
      };

      return (
        <div className="flex max-w-60 items-center justify-between">
          <Link
            className="font-bold"
            href={row.original.short_url}
            rel="noopener norelate"
            target="_blank"
          >{`${process.env.NEXT_PUBLIC_URL}${row.original.short_url}`}</Link>
          <Button
            className="bg-transparent dark:text-accent-foreground"
            size="icon"
            onClick={copyToClipboard}
          >
            <ClipboardCopyIcon />
            <span className="sr-only">Copy to clipboard</span>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "qrCode",
    header: "QR",
  },
  {
    accessorKey: "target",
    header: "Link original",
  },
  {
    accessorKey: "visit_count",
    header: "Visitas",
  },
  {
    accessorKey: "created_at",
    header: "Fecha",
    cell: ({row}) => {
      const date = new Date(row.original.created_at).toLocaleDateString();

      return <div>{date}</div>;
    },
  },
];

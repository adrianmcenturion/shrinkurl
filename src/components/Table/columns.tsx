"use client";

import type {ColumnDef} from "@tanstack/react-table";
import type {LinkProps} from "@/types";

import Link from "next/link";
import {ClipboardCopyIcon} from "@radix-ui/react-icons";
import {ArrowUpDown} from "lucide-react";

import {copyToClipboard, createUrl} from "@/lib/utils";

import {AlertDialog} from "../ui/alert-dialog";
import DeleteLinkButton from "../DeleteLinkButton";
import {Button} from "../ui/button";

export const columns: ColumnDef<LinkProps>[] = [
  {
    accessorKey: "alias",
    header: "Alias",
    cell: ({row}) => {
      return <div className="font-semibold">{row.original.alias}</div>;
    },
  },
  {
    accessorKey: "short_url",
    header: "Link corto",
    cell: ({row}) => {
      return (
        <div className="flex max-w-64 items-center justify-between">
          <Link
            className="font-semibold"
            href={row.original.short_url!}
            rel="noopener norelate"
            target="_blank"
          >
            {createUrl(row.original.short_url!)}
          </Link>
        </div>
      );
    },
  },
  {
    id: "copyButton",
    enableHiding: false,
    cell: ({row}) => {
      const fullUrl = createUrl(row.original.short_url!);

      return (
        <Button
          className="bg-transparent dark:text-accent-foreground"
          size="sm"
          onClick={() => copyToClipboard(fullUrl)}
        >
          <ClipboardCopyIcon />
          <span className="sr-only">Copy to clipboard</span>
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "qrCode",
  //   header: "QR",
  // },
  {
    accessorKey: "target",
    header: "Link original",
  },
  {
    accessorKey: "visit_count",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Visitas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      return <div className="text-center">{row.original.visit_count}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const date = new Date(row.original.created_at!).toLocaleDateString();

      return <div className="text-center">{date}</div>;
    },
  },
  {
    id: "deleteButton",
    enableHiding: false,
    cell: ({row}) => {
      return (
        <AlertDialog>
          <DeleteLinkButton id={row.original.id!} />
        </AlertDialog>
      );
    },
  },
];

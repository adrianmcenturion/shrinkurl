"use client";

import Link from "next/link";
import {Link1Icon, ClipboardCopyIcon} from "@radix-ui/react-icons";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {copyToClipboard, createUrl} from "@/lib/utils";

import {AlertDialog} from "./ui/alert-dialog";
import DeleteLinkButton from "./DeleteLinkButton";

export interface LinkProps {
  id: number;
  alias: string;
  target: string;
  visit_count: number;
  short_url: string;
}

function LinkCard({alias, id, short_url, target, visit_count}: LinkProps) {
  const fullUrl = createUrl(short_url);

  return (
    <Card key={id} className="mx-auto h-full max-h-60 w-full max-w-[350px] bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{alias}</CardTitle>
        <AlertDialog>
          <DeleteLinkButton id={id} />
        </AlertDialog>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between gap-3">
        <CardDescription className="flex w-full items-center justify-start gap-3 text-base md:justify-between">
          <Link className="text-start text-accent-foreground" href={short_url} target="_blank">
            {fullUrl}
          </Link>
          <div className="flex justify-center">
            <Button
              className="dark:text-accent-foreground"
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(fullUrl)}
            >
              <ClipboardCopyIcon />
              <span className="sr-only">Copy to clipboard</span>
            </Button>
            {/* <Button className="dark:text-accent-foreground" size="sm" variant="ghost">
              <Link1Icon />
              <span className="sr-only">QR Code</span>
            </Button> */}
          </div>
        </CardDescription>

        <p className="w-full truncate text-start text-sm opacity-70">{target}</p>
      </CardContent>
      <CardFooter>
        <p className="w-full">Visitas: {visit_count}</p>
      </CardFooter>
    </Card>
  );
}

export default LinkCard;

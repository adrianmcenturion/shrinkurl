"use client";

import Link from "next/link";
import {CopyIcon} from "@radix-ui/react-icons";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {toast} from "@/components/ui/use-toast";

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
  const fullUrl = `${process.env.NEXT_PUBLIC_URL}${short_url}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    toast({
      title: "Copiado!",
      duration: 750,
    });
  };

  return (
    <Card key={id} className="mx-auto w-full max-w-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{alias}</CardTitle>
        <AlertDialog>
          <DeleteLinkButton id={id} />
        </AlertDialog>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <CardDescription className="flex flex-col items-center gap-3 text-lg md:flex-row">
          <Link href={fullUrl} target="_blank">
            {fullUrl}
          </Link>
          <Button size="sm" onClick={copyToClipboard}>
            <CopyIcon />
            <span className="sr-only">Copy to clipboard</span>
          </Button>
        </CardDescription>
        <div>
          <p>Visitas: {visit_count}</p>
        </div>
      </CardContent>
      <CardFooter>
        <p>{target}</p>
      </CardFooter>
    </Card>
  );
}

export default LinkCard;

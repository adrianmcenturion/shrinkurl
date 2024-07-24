/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {useState, useTransition} from "react";
import Link from "next/link";

import {cn} from "@/lib/utils";
import {toast} from "@/components/ui/use-toast";
import {createLinkAndGetIt} from "@/app/dashboard/actions";

import {Button} from "./ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "./ui/form";
import {Input} from "./ui/input";

const FormSchema = z.object({
  target: z.string().min(1, "Ingrese una url a acortar"),
});

function LinkShortener() {
  const [isPending, startTransition] = useTransition();
  const [newLink, setNewLink] = useState({target: "", short_url: ""});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      target: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const result = await createLinkAndGetIt(data);

      const {data: resp, error} = result;

      if (error?.message) {
        toast({
          variant: "destructive",
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "Link creado!",
          duration: 750,
        });
        form.reset();

        const newLink: {target: string; short_url: string} = {
          target: resp![0].target,
          short_url: `${process.env.NEXT_PUBLIC_URL}${resp![0].short_url}`,
        };

        setNewLink(newLink);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full items-center justify-center "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="target"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full rounded-r-none border-r-0"
                  placeholder="Url a acortar"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="relative inline-flex w-fit  gap-2 overflow-hidden rounded-xl rounded-l-none bg-background p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          type="submit"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl rounded-l-none bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Acortar url
            <AiOutlineLoading3Quarters className={cn("animate-spin", {hidden: !isPending})} />
          </span>
        </Button>
      </form>
      {newLink ? (
        <Link
          className="text-center transition-all duration-700 ease-in animate-in"
          href={newLink.short_url}
          target="_blank"
        >
          {newLink.short_url}
        </Link>
      ) : null}
    </Form>
  );
}

export default LinkShortener;

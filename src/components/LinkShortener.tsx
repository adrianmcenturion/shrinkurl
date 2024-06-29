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
      <form className="flex w-full justify-center  " onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="target"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Url a acortar"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="flex w-fit gap-2" type="submit">
          Acortar url
          <AiOutlineLoading3Quarters className={cn("animate-spin", {hidden: !isPending})} />
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

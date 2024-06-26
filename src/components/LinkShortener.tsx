"use client";

import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {useState} from "react";
import Link from "next/link";

import {cn} from "@/lib/utils";
import {toast} from "@/components/ui/use-toast";
import {createAnonLink, readAnonLinks} from "@/app/actions";

import {Button} from "./ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {Input} from "./ui/input";

const FormSchema = z.object({
  target: z.string(),
});

function LinkShortener() {
  const [newLink, setNewLink] = useState({target: "", short_url: ""});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      target: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // startTransition(async () => {
    const result = await createAnonLink(data);

    console.log("data anon", data);

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

      console.log("resp", resp);
      const newLink = {
        target: `${process.env.NEXT_PUBLIC_URL}${resp![0].target}`,
        short_url: resp![0].short_url,
      };

      setNewLink(newLink);
    }
    // });
  };

  return (
    <Form {...form}>
      <form
        className="flex items-center justify-between gap-3 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="target"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="target" {...field} onChange={field.onChange} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="flex w-full gap-2" type="submit">
          Acortar
          {/* <AiOutlineLoading3Quarters className={cn("animate-spin", {hidden: !isPending})} /> */}
        </Button>
      </form>
      {newLink ? (
        <Link href={newLink.target} target="_blank">
          {newLink.short_url}
        </Link>
      ) : null}
    </Form>
  );
}

export default LinkShortener;

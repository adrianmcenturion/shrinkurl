"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {useTransition} from "react";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {toast} from "@/components/ui/use-toast";

import {createShortLink} from "../actions";

const FormSchema = z.object({
  alias: z.string(),
  target: z.string(),
});

export default function CreateLinks() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      alias: "",
      target: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const result = await createShortLink(data);

      const {error} = result;

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
        });
        form.reset();
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 lg:flex lg:flex-row lg:items-end lg:justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="alias"
          render={({field}) => (
            <FormItem>
              <FormLabel>Alias</FormLabel>
              <FormControl>
                <Input placeholder="alias" {...field} type="alias" onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target"
          render={({field}) => (
            <FormItem>
              <FormLabel>Target</FormLabel>
              <FormControl>
                <Input placeholder="target" {...field} type="text" onChange={field.onChange} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="flex w-full gap-2 lg:gap-0" type="submit">
          Enviar
          <AiOutlineLoading3Quarters className={cn("animate-spin", {hidden: !isPending})} />
        </Button>
      </form>
    </Form>
  );
}

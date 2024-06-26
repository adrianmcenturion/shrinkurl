import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {useTransition} from "react";
import {redirect} from "next/navigation";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn, publicPaths} from "@/lib/utils";
import {toast} from "@/components/ui/use-toast";

import {SignUpWithEmailAndPassword} from "../actions";

const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Mínimo 6 caracteres",
    }),
    confirm: z.string().min(6, {
      message: "Mínimo 6 caracteres",
    }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await SignUpWithEmailAndPassword(data);

      const {error} = result;

      if (error?.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "Registro con exito",
        });
        redirect(publicPaths.login);
      }
    });
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder="Contraseña"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({field}) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirmar contraseña"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="flex w-full gap-2" type="submit">
          Registrar
          <AiOutlineLoading3Quarters className={cn("animate-spin", {hidden: !isPending})} />
        </Button>
      </form>
    </Form>
  );
}

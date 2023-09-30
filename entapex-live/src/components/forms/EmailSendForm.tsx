"use client";

import { emailSchema } from "@/lib/email/utils";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "../icons";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  body: z.string().min(5, {
    message: "Body bust be at least 5 characters.",
  }),
});

type FormInput = z.infer<typeof emailSchema>;
type Errors = { [K in keyof FormInput]: string[] };

export function EmailSendForm() {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      body: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrors(null);

    try {
      const payload = emailSchema.parse({
        name: values.name,
        email: values.email,
        body: values.body,
      });
      console.log(payload);
      const req = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { id } = await req.json();
      if (id) {
        return toast({
          title: "Email Sent!",
          description:
            "We have sent an email with the details that you provided please check inbox.",
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.flatten().fieldErrors as Errors);
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 pt-4 border-t mt-4"
      >
        {errors && <p className="p-3">{JSON.stringify(errors, null, 2)}</p>}
        <div className="md:flex md:space-x-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is email receiver's public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormDescription>This is receiver's email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea placeholder="Hi Mom!" {...field} />
              </FormControl>
              <FormDescription>This is email Body</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={sending}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Send
        </Button>
      </form>
    </Form>
  );
}

"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import SplashScreen from "./SplashScreen";
import { useRouter } from "next/navigation";
import HomeService from "@/service/endpoints";

export default function LoginScreen() {
  const [showSplash, setShowSplash] = React.useState(true);
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await HomeService.login(values);
      console.log(response);
      if (response) {
        localStorage.setItem("idToken", response.idToken);
        localStorage.setItem("localId", response.localId);
      }
      if (localStorage.getItem("idToken") && localStorage.getItem("localId")) {
        router.push(`/home`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-neutral-100 text-[#333333] font-[family-name:var(--font-geist-sans)]">
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-5xl font-bold">LuminFlights</h2>
            <p className="text-xl font-semibold">All Reservations in one place.</p>
          </div>
          <div className="border border-black rounded-lg py-12 px-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 w-[340px]">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg@gmail.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin123"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  size={"lg"}
                  type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

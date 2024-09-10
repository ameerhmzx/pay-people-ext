import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@nextui-org/react";
import useLogin from "@/entrypoints/popup/api/use-login.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@nextui-org/input";
import { EnterIcon } from "@radix-ui/react-icons";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/_unauthenticated/login")({
  component: Login,
});

interface Credentials {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function Login() {
  const { mutateAsync: login, isError, error } = useLogin();
  const { register, formState, handleSubmit } = useForm<Credentials>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="flex flex-col gap-12 h-full w-full justify-center items-center">
      <img src={logo} alt="logo" className="h-16" />
      <form
        onSubmit={handleSubmit((c) => login(c))}
        className="w-[300px] space-y-2"
      >
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          {...register("email")}
          errorMessage={formState.errors.email?.message}
          isInvalid={!!formState.errors.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          {...register("password")}
          errorMessage={formState.errors.password?.message}
          isInvalid={!!formState.errors.password}
        />
        {isError && <div className="text-danger">{error?.message}</div>}
        <Button
          fullWidth
          type="submit"
          isLoading={formState.isSubmitting}
          color="primary"
        >
          Login
          <EnterIcon />
        </Button>
      </form>
    </div>
  );
}

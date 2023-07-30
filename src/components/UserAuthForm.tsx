"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Icons from "./ui/Icons";
import { useToast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      // toast notification
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        size="sm"
        className="w-full"
        onClick={loginWithGoogle}
        isLoading={isLoading}
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;

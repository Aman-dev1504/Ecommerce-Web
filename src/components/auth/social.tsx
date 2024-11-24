"use client"

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";


export function Social(){
    function onClick(provider: 'google') {
        signIn(provider)
      }
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                variant="outline"
                className="w-full"
                onClick={() => onClick('google')}
            >
                <FcGoogle className="size-5" />
            </Button>
        </div>
    )
}
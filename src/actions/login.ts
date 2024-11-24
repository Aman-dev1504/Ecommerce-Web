"use server"

import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/helpers/authHelper";
import { LoginSchema, loginSchema } from "@/zod-schemas";
import { AuthError } from "next-auth";

export async function login(values: loginSchema){
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: 'Invalid fields!'}
    }
    const {email, password} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser){
        return { error: "User with this email does not exist" }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: '/'
        })
        return {success: "User Logged In"}
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) { 
              case 'CredentialsSignin':
                return { error: 'Invalid credentials!' }
              default:
                return { error: 'Something went wrong.' }
            }
        }
        throw error
    }
}
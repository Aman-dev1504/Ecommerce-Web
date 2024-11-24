"use server"
import * as z from 'zod';
import { RegisterSchema, registerSchema } from "@/zod-schemas";
import { hash } from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/lib/helpers/authHelper';

export async function register(values: registerSchema){
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: 'Invalid fields!'}
    }
    const {email, password, name} = validatedFields.data
    const hashedPassword = await hash(password, 10)

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return {error: 'Email already taken'}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
     })
    return {success: 'User Created'}
    
}
import { db } from "../db";
import { auth } from "@/auth";

export async function getUserByEmail(email: string){
    try {
        const user = db.user.findUnique({where: {email}})
        return user;
    } catch (error) {
        return null
    }
}

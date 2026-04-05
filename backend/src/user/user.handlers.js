import { prisma } from "../db/db.js";

export async function getUserByName(username){

    const user = await prisma.user.findUnique({
    where: { username: `${username.toLowerCase()}` },
    });
}
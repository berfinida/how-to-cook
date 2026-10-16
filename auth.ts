import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const credentials = z.object({ email:z.string().email(), password:z.string().min(8) });
export const { handlers, auth, signIn, signOut } = NextAuth({ session:{strategy:"jwt"}, providers:[CredentialsProvider({name:"Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(input){const parsed=credentials.safeParse(input);if(!parsed.success)return null;const user=await prisma.user.findUnique({where:{email:parsed.data.email.toLowerCase()}});if(!user?.passwordHash||!await compare(parsed.data.password,user.passwordHash))return null;return {id:user.id,email:user.email,name:user.name};}})], pages:{signIn:"/tr/login"}, secret:process.env.NEXTAUTH_SECRET});

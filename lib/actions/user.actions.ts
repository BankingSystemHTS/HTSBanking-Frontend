'use server'
import { cookies } from "next/headers";
import { createAdminClient } from './appwrite';

export const signIn = async ({ email, password }: { email: string, password: string }) => {
   try {
      
   } catch (error) {
      console.log(error);
   }
}

export const signUp = async (userData: SignUpParams) => {
   try { 
      const { account } = await createAdminClient();
      await account.create(
         ID.unique(),
         userData.firstName,
         userData.lastName,
         userData.email,
      )

      const session = await account.createEmailPasswordSession(userData.email, userData.password);

      const sessionCookies = await cookies();
      sessionCookies.set("my_session", session.secret, {
         path: "/",
         httpOnly: true,
         sameSite: "strict",
         secure: true,
      })
   } catch (error) {
      console.log(error);
   }
}

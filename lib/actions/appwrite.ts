'use server'
import { cookies } from "next/headers";
import { Account, Client, Databases, Users } from "node-appwrite";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const sessionCookies = await cookies();
  const session = await sessionCookies.get("my_session");
  if (!session || !session.value) {
    throw new Error("Session not found");
  }
  client.setSession(session.value);
  return {
    get account() {
      return new Account(client);
    },
  };
}

//used to create a new session for sign up and login
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY ?? "");
  return {
    get account() {
      return new Account(client);
     },
     get database() {
        return new Databases(client);
     },
     get user() {
        return new Users(client);
     }
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.error("Error fetching logged in user:", error);
    return null; // or handle the error as needed
  }
}

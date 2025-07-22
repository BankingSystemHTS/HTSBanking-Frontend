'use server'
import { cookies } from "next/headers";
import { Account, Client, Databases, Users } from "node-appwrite";

//should create a new client for each request made to the appwrite 
//read session cookies from each request and set it to the client
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const sessionCookies = await cookies();
  const session = sessionCookies.get("my_session");
  if (!session || !session.value) {
    throw new Error("No Session found");
  }
  client.setSession(session.value);
  return {
    get account() {
      return new Account(client);
    }  
  };
}

//only used to perform admin actions, create a new session for sign up and login
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);
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


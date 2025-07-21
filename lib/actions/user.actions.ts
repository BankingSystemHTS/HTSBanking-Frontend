"use server";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "./appwrite";
import { Account, Client, ID } from "node-appwrite";
import { parseStringify } from "../utils";
import { redirect } from "next/navigation";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    //mutation / database / make fetch
    const { account } = await createAdminClient(); 
    const session = await account.createEmailPasswordSession(email, password);

    //set cookies
    const cookieStore = await cookies();
    cookieStore.set("my_session", session.secret, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    return parseStringify(session);
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  //sign up step 1: register user in database
  const { email, password, firstName, lastName } = userData;
  let newUserAccount;
  try {
    const { account } = await createAdminClient();
    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      firstName + " " + lastName
    );

    //sign up step 2: create session and store it in cookies
    const session = await account.createEmailPasswordSession(email, password);

    const sessionCookies = await cookies();
    sessionCookies.set("my_session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } catch (error) {
    console.log(error);
  }
  const cleaned = parseStringify(newUserAccount);
  return cleaned;
};

export async function getLoggedInUser() {
  try {
    const sessionClient = await createSessionClient();
    if (!sessionClient) {
      return null;
    }
    const { account } = sessionClient;
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    console.error("Error fetching logged in user:", error);
     // or handle the error as needed
  }
}

export async function signOut() {
  const sessionClient = await createSessionClient();
  if (!sessionClient) {
    console.error("No session client found. User may not be logged in.");
    return;
  }
  const sessionCookies = await cookies();
  sessionCookies.delete("my_session");
  await sessionClient.account.deleteSession("current");

  redirect("/sign-in");
}

"use server";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "./appwrite";
import { Account, Client, ID } from "node-appwrite";
import { encryptId, parseStringify } from "../utils";
import { redirect } from "next/navigation";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { plaidClient } from "./plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource } from "./dwolla.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID
} = process.env; 

export const signIn = async ({ email, password }: signInProps) => {
  try {
    //mutation / database / make fetch
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    //set cookies
    const cookieStore = await cookies();
    cookieStore.set("my_session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      // secure: true,
    });
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
      // secure: true,
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
  try {
    const sessionClient = await createSessionClient();
    if (!sessionClient) {
      console.error("No session client found. User may not be logged in.");
      return;
    }
    const sessionCookies = await cookies();
    sessionCookies.delete("my_session");
    await sessionClient.account.deleteSession("current");
  } catch (error) {
    console.error("Error signing out:", error);
  }
  redirect("/sign-in");
}

export const createLinkToken = async (user: User) => {
  try {
    const tokenParam = {
      user: {
        client_user_id: user.$id,
      },
      client_name: user.name,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };
    const response = await plaidClient.linkTokenCreate(tokenParam);
    return parseStringify(response.data.link_token);
  } catch (error) {
    console.log(error);
  }
};

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  sharableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();
    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        sharableId,
      }
    )
    return parseStringify(bankAccount);
  } catch (error) {}
};

export const exchangePublicToken = async ({ publicToken, user}: exchangePublicTokenProps) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    const account = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const accountData = account.data.accounts[0];

    //Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(
      request
    );
    const processorToken = processorTokenResponse.data.processor_token;

    //create a funding source URL for the account using the Dwolla customer Id,
    //processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    //If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    //Create a bank account using the user ID, item ID, account ID, access token
    //funding source URL, and sharable ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });

    //Revalidate the path to reflect changes
    revalidatePath("/");
    //return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occured while creating exchange token:", error);
  }
};

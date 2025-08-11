import { Client } from 'dwolla-v2';

import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'; 

const configuration = new Configuration({
   basePath: PlaidEnvironments.sandbox,
   baseOptions: {
      headers: {
         'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID!,
         'PLAID-SECRET': process.env.PLAID_SECRET!,
      }
   }
})

export const plaidClient = new PlaidApi(configuration);


// //1) Get a link token
// export async function createLinkToken() {
//    const response = await plaidClient.linkTokenCreate({
//       user: { client_user_id: 'unique_user_id' },
//       client_name: "My App",
//       products: ["auth"],
//       contry_codes: ["US"],
//       language: "en",
//    })
//    return response.data.link_token;
// }

// //2) Exchange for Access Token
// export async function exchangePublicToken(publicToken: string) {
//    const response = await plaidClient.itemPublicTokenExchange({ publicToken });
//    return response.data.access_token;
// 

const getEnvironment = () => {
  const env = process.env.DWOLLA_ENV as string;
  switch (env) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to 'sandbox' or 'production'"
      );
  }
};


export const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});


// import { NextResponse } from 'next/server';
// import { createAdminClient } from '@/lib/actions/appwrite';

// export async function POST(req: Request) {
//    const { email, password } = await req.json();
//    const { account } = await createAdminClient();
//    const session = await account.createEmailPasswordSession(email, password);

//    if (!session || !session.secret) {
//       return NextResponse.json(
//          { error: "Failed to create session. Please check your credentials." },
//          { status: 400 }
//       );
//    }
//    const res = NextResponse.json({ success: true });
//    res.cookies.set("my_session", session.secret, {
//       httpOnly: true,
//       sameSite: "strict",
//       secure: true,
//       path: "/",
//    })
//    return res;
// }
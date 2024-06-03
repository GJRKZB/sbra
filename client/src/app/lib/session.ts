import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2hrs")
    .sign(encodedKey);
}

export async function decrypt(session: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}
export async function createSession(username: string) {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ username, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// export async function getSession() {
//   const session = cookies().get("session")?.value;
//   if (!session) return null;

//   return await decrypt(session);
// }

export async function getUser(): Promise<{
  isAuthenticated: boolean;
  user?: { username: string };
}> {
  const session = cookies().get("session")?.value;
  const verified = session && (await decrypt(session));

  if (verified) {
    return {
      isAuthenticated: true,
      user: { username: verified.username },
    };
  }
  return { isAuthenticated: false };
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function deleteSession() {
  cookies().set("session", "", { expires: new Date(0) });
}

import { NextUIProvider } from "@nextui-org/react";
import { getSession } from "./lib/session";

export default async function page() {
  const session = await getSession();

  return (
    <div>
      <NextUIProvider>
        <div>
          <button>Logout</button>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </NextUIProvider>
    </div>
  );
}

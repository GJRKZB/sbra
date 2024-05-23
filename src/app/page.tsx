import { getSession, deleteSession } from "./lib/session";

export default async function page() {
  const session = await getSession();

  return (
    <div>
      <div>
        <h1>{session ? `Welcome, ${session.username}` : `Not logged in`}</h1>
        <br />
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <br />
        <form
          action={async () => {
            "use server";
            await deleteSession();
          }}
        >
          <br />
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  );
}

import "server-only";

export async function fetchRestaurants() {
  const res = await fetch(`${process.env.SERVER_URL}/api/restaurants`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  return res.json();
}

import axios from "axios";
import { getToken } from "../service/authService";

export async function fetchRestaurants() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurants`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchUserRestaurantReviews(slug: string) {
  const token = getToken();
  if (!token) {
    return null;
  }
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${slug}/reviews`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return null;
  }
}

export async function addUserRestaurantReviews(
  userId: string,
  restaurantId: string,
  reviews: { label: string; rating: number }[]
) {
  const token = getToken();
  if (!token) {
    throw new Error("User not authenticated");
  }
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews`,
      { userId, restaurantId, reviews },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user reviews:", error);
    throw error;
  }
}

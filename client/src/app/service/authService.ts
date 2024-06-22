import axios from "axios";

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData extends ILoginData {
  username: string;
  confirmPassword: string;
}

export const login = async (data: ILoginData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`,
      data
    );
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      return { success: true, messsage: response.data.message };
    }
    return { success: false, message: "Login failed" };
  } catch (error: any) {
    return { success: false, message: error.response.data.error };
  }
};

export const register = async (data: IRegisterData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`,
      data
    );
    if (response.data.success) {
      return { success: true, message: response.data.message };
    }
    return { success: false, message: "Registration failed" };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.error || "An error occurred",
    };
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};

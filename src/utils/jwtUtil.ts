/* eslint-disable @typescript-eslint/no-explicit-any */
import {jwtDecode} from 'jwt-decode';

export const getJwtToken = (): string | null => {
  const token = localStorage.getItem("jwtToken");
  console.log("Retrieved token from localStorage:", token);
  return token;
};

export const isAuthenticated = (): boolean => {
  const token = getJwtToken();
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    console.log("Decoded token:", decoded, "Current time:", currentTime);
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

export const extractUserDetails = (): { userId: string; roles: string[] } | null => {
  const token = getJwtToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return {
      userId: decoded.userId,
      roles: decoded.roles,
    };
  } catch (error) {
    console.error("Error extracting user details:", error);
    return null;
  }
};

export const setJwtToken = (token: string): void => {
  console.log("Setting token in localStorage:", token);
  localStorage.setItem("jwtToken", token);
};

export const clearJwtToken = (): void => {
  console.log("Clearing token from localStorage");
  localStorage.removeItem("jwtToken");
};
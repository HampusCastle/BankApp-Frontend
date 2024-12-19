/* eslint-disable @typescript-eslint/no-explicit-any */
import {jwtDecode} from 'jwt-decode';

export const extractUserDetails = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    return {
      userId: decoded.userId,
      accountId: decoded.accountId, 
      roles: decoded.roles,  
    };
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return null;
  }
};
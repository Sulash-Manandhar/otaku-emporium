import { ACCESS_TOKEN, REFRESH_TOKEN, USER_INFO } from "../constant/common";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN);
}

export function getUserStatus() {
  return localStorage.getItem(USER_INFO);
}

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

export function setRefreshToken(token: string) {
  localStorage.setItem(REFRESH_TOKEN, token);
}

export function setUserInfo(userData: any) {
  localStorage.setItem(USER_INFO, userData);
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

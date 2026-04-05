export function getToken(){
  return localStorage.getItem("app-token");
};

export function setToken(token){
  localStorage.setItem("app-token", token);
};

export function removeToken(){
  localStorage.removeItem("app-token");
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  // decode jwt token to check expiration
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiration = payload.exp * 1000; // convert to milliseconds
    if (expiration < Date.now()) {
      // Token is expired
      throw new Error();
    }
    return true;
  } catch {
    removeToken();
    return false;
  }
};

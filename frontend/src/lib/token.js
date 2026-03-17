export function getToken(){
  return localStorage.getItem("app-token");
};

export function setToken(token){
  localStorage.setItem("app-token", token);
};

export function removeToken(){
  localStorage.removeItem("app-token");
};

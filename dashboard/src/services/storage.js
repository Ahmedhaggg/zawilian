
export const getToken = () => localStorage.getItem("teacher_token");

export const setToken = (token) => localStorage.setItem("teacher_token", token);

export const destroyToken = () => localStorage.removeItem("teacher_token");
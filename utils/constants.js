export const regUser = /^[A-Za-z0-9_-]{3,15}$/;
export const regPasswd = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/; 
export const regTel = /^\d{9}$/;     
export const regPCode = /^\d{5}$/;

export const oneDay = 24 * 60 * 60 * 1000;
export const oneYear = oneDay * 365;
import { USER_DETAILS_KEY } from "../Constants";

export const validateEmail = (email: String) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getUserDetailFromLocalStorage = () => {
  const userDetailsString = localStorage.getItem(USER_DETAILS_KEY);

  try {
    if (userDetailsString) {
      return JSON.parse(userDetailsString);
    }
  } catch (e) {
    return null;
  }
};

import axios from "axios";

export default () => {
  let currentUserString = window.localStorage.currentUser;
  let currentUser = currentUserString ? JSON.parse(currentUserString) : "";
  return axios.create({
    baseURL: "https://61d3f493b4c10c001712bb63.mockapi.io",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: currentUser && currentUser.token,
    },
  });
};

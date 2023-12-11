import { jwtDecode } from "jwt-decode";

const url = `/api/users`;
export const getUser = async (token) => {
  const decoded = jwtDecode(token);
  const userId = decoded.ID;
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", "Bearer " + localStorage.getItem("token"));
  const options = {
    method: "GET",
    headers: headers,
  };
  const result = await fetch(url + `/${userId}`, options);

  if (result.ok) {
    const user = await result.json();
    const username = user.username;
    const userid = user.id;
    localStorage.setItem("user", username);
    localStorage.setItem("userid", userid);
  }
};

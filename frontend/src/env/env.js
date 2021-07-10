import Cookies from "js-cookie";

// export const domain = "http://127.0.0.1:8000";
export const domain = "http://127.0.0.1:8000/api";
export const domain2 = "http://127.0.0.1:8000";

export const token = window.localStorage.getItem("token");
const csrftoken = Cookies.get("csrftoken");
export const header = {
    "Content-Type": "application/json",
    Authorization: `token ${token}`,
};
//     "X-CSRFToken": csrftoken,
export const header_without_token = {
    "Content-Type": "application/json",
    "X-CSRFToken": csrftoken,
};
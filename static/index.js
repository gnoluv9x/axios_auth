// get button
const loginBtn = document.getElementById("login");
const getUserBtn = document.getElementById("getUsers");

// create instance axios
const instance = axios.create({
  baseURL: "/api",
  timeout: 3 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axios handle interceptors
instance.interceptors.request.use(
  config => config,
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async response => {
    try {
      const { config, data } = response;
      if (config.url.indexOf("/login") !== -1 || config.url.indexOf("/refreshToken") !== -1) {
        return response;
      }
      if (data.data.code === 401) {
        // call api to get token from refreshtoken
        console.log("Token het cmnr han roi");
        const {
          status,
          data: { accessToken },
        } = await getRefreshToken();
        if (status === "success") {
          console.log("Co token moi roi ba con oi");
          // save to cookies
          setCookie("accessToken", accessToken, 100);

          return instance(config);
        }
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

// add event listeners
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const {
      status,
      data: { accessToken },
    } = await login();

    // save token to cookies
    if (status === "success") {
      setCookie("accessToken", accessToken, 100);
    }
  });
}

if (getUserBtn) {
  getUserBtn.addEventListener("click", async () => {
    const { status, data } = await getUsers();
    console.log("data from users:", data);
  });
}

// api method
async function login() {
  return (await instance.get("/login")).data;
}
async function getUsers() {
  return (await instance.get("/users")).data;
}

async function getRefreshToken() {
  return (await instance.get("/refreshToken")).data;
}

// localStorage interactive
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

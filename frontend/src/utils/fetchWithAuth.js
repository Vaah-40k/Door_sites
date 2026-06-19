let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

async function refreshTokens() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("Нет refresh токена");

  const res = await fetch("http://localhost:3500/refresh-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error("Ошибка обновления токена");
  const data = await res.json();
  if (!data.success) throw new Error(data.message);

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  window.dispatchEvent(new Event("authSuccess"));
  return data.accessToken;
}

async function fetchWithAuth(url, options = {}, retries = 1) {
  const makeRequest = async (token) => {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return fetch(`http://localhost:3500${url}`, { ...options, headers });
  };

  let token = localStorage.getItem("accessToken");
  let response = await makeRequest(token);

  // Обрабатываем и 401, и 403
  if ((response.status === 401 || response.status === 403) && retries > 0) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await refreshTokens();
        onRefreshed(newToken);
        token = newToken;
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.dispatchEvent(new Event("authSuccess"));
        throw new Error("Сессия истекла, войдите снова");
      } finally {
        isRefreshing = false;
      }
    } else {
      await new Promise((resolve) => {
        refreshSubscribers.push((newToken) => {
          token = newToken;
          resolve();
        });
      });
    }
    response = await makeRequest(token);
  }
  return response;
}

export default fetchWithAuth;

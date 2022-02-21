export default async (method, url, payload = {}) => {
  const resources = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: method ?? "GET",
    body: method != "GET" ? JSON.stringify(payload) : null,
  };

  const data = await fetch(url, resources);

  let result = {
    status: data.status,
    ok: data.ok,
  };

  if (data.ok === true) {
    result = { ...result, ...(await data.json()) };
  } else {
    result = [];
  }

  return result;
};

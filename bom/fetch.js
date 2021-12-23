export default async function $fetch(url, params, config) {
  const { method = "POST", headers } = config;
  let body;
  if (method !== "GET") {
    body = JSON.stringify(params);
  }
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body,
  });
  return response.json();
}

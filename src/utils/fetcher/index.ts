export const coinAPIfetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      Accept: "text/plain",
      "X-CoinAPI-Key": process.env.REACT_APP_COIN_API_KEY as string,
    },
  }).then(async (r) => r.json());

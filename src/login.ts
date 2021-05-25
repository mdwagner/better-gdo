import { ryobiLoginUrl } from "./constants.ts";
import type { LoginResponse } from "./types.ts";

export const login = (): Promise<LoginResponse> => {
  return fetch(ryobiLoginUrl, {
    method: "POST",
    headers: {
      "x-tc-transform": "tti-app",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username: Deno.env.get("RYOBI_USERNAME"),
      password: Deno.env.get("RYOBI_PASSWORD"),
    }),
  })
    .then((response) => response.json());
};

import { ryobiDevicesUrl } from "./constants.ts";
import type { DeviceIdResponse } from "./types.ts";

export const state = (deviceId: string): Promise<DeviceIdResponse> => {
  const query = new URLSearchParams([
    ["username", Deno.env.get("RYOBI_USERNAME")!],
    ["password", Deno.env.get("RYOBI_PASSWORD")!],
  ]);

  return fetch(`${ryobiDevicesUrl}/${deviceId}?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json());
};

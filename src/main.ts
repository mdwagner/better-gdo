import { ryobiWSUrl } from "./constants.ts";
import type {
  AuthenticateResponse,
  RyobiRequest,
  RyobiResponse,
} from "./types.ts";
import { login } from "./login.ts";

async function main() {
  // login to ryobi
  const { result } = await login();

  // say hello to user
  console.log(`Hello ${result.metaData.userName}!`);

  // start ws connection with ryobi
  const ws = new WebSocket(ryobiWSUrl);

  // login to ws connection
  ws.addEventListener("open", () => {
    const req: RyobiRequest = {
      jsonrpc: "2.0",
      method: "srvWebSocketAuth",
      params: {
        varName: result.varName,
        apiKey: result.auth.apiKey,
      },
    };
    ws.send(JSON.stringify(req));
  });

  // listen for incoming messages
  ws.addEventListener("message", (event) => {
    const response = JSON.parse(event.data) as RyobiResponse;

    switch (response.method) {
      case "authorizedWebSocket": {
        const data = response as AuthenticateResponse;
        if (data.params.authorized) {
          console.log("logged in!");
        } else {
          console.log("failed to login...");
          console.debug(data);
        }
        break;
      }
      default: {
        console.log(response);
        break;
      }
    }
  });

  ws.addEventListener("error", (event) => {
    console.log(event);
  });

  // disconnect from server on ^C
  for await (const _ of Deno.signal(Deno.Signal.SIGINT)) {
    ws.close();
    Deno.exit();
  }
}

if (import.meta.main) {
  // main();

  const w = new Worker(
    new URL("./workers/gdo-worker.ts", import.meta.url).href,
    {
      type: "module",
      deno: {
        namespace: true,
      },
    }
  );

  w.postMessage({ message: "hello" });
  setTimeout(() => (console.log("times up!"), w.terminate()), 5000);
}

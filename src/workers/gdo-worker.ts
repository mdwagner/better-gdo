// deno-lint-ignore-file no-explicit-any
self.addEventListener("message", (event) => {
  const data = (event as any).data;
  console.log(`Worker says: ${JSON.stringify(data)}`);
});

export const DATA_NUM = 100;

if (import.meta.main) {
  await createData();
}

async function createData() {
  await refreshDir("data-sync");
  await refreshDir("data-async");
  const data = new Array(10000).fill(0).map((_) => crypto.randomUUID());

  console.log("creating data...");
  const funcs = new Array(DATA_NUM).fill(0).flatMap((_, i) => [
    Deno.writeTextFile(`./data-sync/${i}.json`, JSON.stringify(data)),
    Deno.writeTextFile(`./data-async/${i}.json`, JSON.stringify(data)),
  ]);
  await Promise.all(funcs);
  console.log("created data");
}

async function refreshDir(folderPath: string) {
  try {
    await Deno.remove(folderPath, { recursive: true });
  } catch (_) {
    //
  }
  try {
    await Deno.mkdir(folderPath);
  } catch (_) {
    //
  }
}

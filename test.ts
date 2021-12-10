const DATA_NUM = 100;

await createData();

Deno.test({
  name: "sync function",
  fn: async () => {
    console.time("readFileSync");

    const funcs = new Array(DATA_NUM).fill(0).map((_, i) => readFileSync(i));
    await Promise.all(funcs);
    console.timeEnd("readFileSync");
  },
});

Deno.test({
  name: "async function",
  fn: async () => {
    console.time("readFileAsync");
    const funcs = new Array(DATA_NUM).fill(0).map((_, i) => readFileAsync(i));
    await Promise.all(funcs);
    console.timeEnd("readFileAsync");
  },
});

async function readFileSync(i: number) {
  await new Promise((resolve) => {
    resolve("");
  });
  Deno.readFileSync(`./data/${i}.json`);
}
async function readFileAsync(i: number) {
  await new Promise((resolve) => {
    resolve("");
  });
  await Deno.readFile(`./data/${i}.json`);
}

async function createData() {
  try {
    Deno.removeSync("data", { recursive: true });
  } catch (_) {}
  try {
    Deno.mkdir("data");
  } catch (_) {}
  const data = new Array(10000).fill(0).map((_) => crypto.randomUUID());

  console.log("creating data...");
  const funcs = new Array(DATA_NUM).fill(0).map((_, i) =>
    Deno.writeTextFile(`./data/${i}.json`, JSON.stringify(data))
  );
  await Promise.all(funcs);
  console.log("created data");
}

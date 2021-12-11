import { DATA_NUM } from "./create-data.ts";

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
  // console.log(`reading data ${i} by sync`);
  await new Promise<void>((resolve) => {
    Deno.readFileSync(`./data-sync/${i}.json`);
    return resolve();
  });
  // console.log(`read data ${i} by sync`);
}
async function readFileAsync(i: number) {
  // console.log(`reading data ${i} by async`);
  await Deno.readFile(`./data-async/${i}.json`);
  // console.log(`read data ${i} by async`);
}

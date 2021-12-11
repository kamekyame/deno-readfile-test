# Deno readFile Performance Test

`Deno.readFile`と`Deno.readFileSync`でのファイル読み込み時間を比較します。

## Run

- 380KBのテキストファイルを100個(`DATA_NUM`)生成(dataディレクトリ内)
- `Deno.readFile`と`Deno.readFileSync`での読み込み時間を比較
  - 1つのファイルを読み込む非同期関数を作成（[create-data.ts](./create-data.ts)）
  - `Promise.all`を使用して全てのファイルを並列で読み込む（[test.ts](./test.ts)）

```console
> deno run -A create-data.ts
> deno test -A test.ts
```

## Result

環境

```
Intel(R) Core(TM) i5-6300U CPU @ 2.40GHz   2.50 GHz
RAM	8.00 GB
SSD
Deno 1.16.2
```

```console
> deno test -A .\test.ts
running 2 tests from file:///C:/Users/Kamek/Documents/gh/kamekyame/deno-readfile-test/test.ts
test sync function ...readFileSync: 83ms

 ok (104ms)
test async function ...readFileAsync: 118ms

 ok (141ms)

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (284ms)
```

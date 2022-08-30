import pinyin from "pinyin";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
  heteronym: true,
};

fs.readFile(path.join(__dirname, "input.json"), "utf8", function (err, data) {
  if (err) throw err;
  const input = JSON.parse(data);
  const output = input.reduce((acc, cur) => {
    const arr = pinyin(cur, config);
    acc[cur] = arr.flat().join("-");
    return acc;
  }, {});
  console.log(output);
});

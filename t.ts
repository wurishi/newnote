import http from "http";
import crypto from "crypto";
import crc32 from "crc-32"; // npm i crc-32

const L2S: Record<string, string> = {};
const S2L: Record<string, string> = {};

const server = http.createServer();

server.listen(3333).on("request", (req, res) => {
  if (req.url) {
    const arr = req.url.split("/");
    // TODO: params 更健壮的验证
    // TODO: 更规范化的路由
    if (arr[1] === "save") {
      const short = save(req.url.substring(6)); // root/ + save + / = 6
      res.write(short);
      res.end();
    } else if (arr[1] === "load") {
      const url = load(req.url.substring(6));
      if (url) {
        res.write(url);
      } else {
        res.statusCode = 404;
      }
      res.end();
    }
  }
});

function save(longURL: string) {
  if (L2S[longURL]) {
    return L2S[longURL];
  }
  const md5 = crypto.createHash("md5");
  md5.update(longURL);
  // TODO: crc32 存在 2^32 发生碰撞的情况，需要引入一个 DB 层面的 uuid 生成方案
  // TODO: 生成的 short 需要 encodeURI
  const shortURL = crc32.str(md5.digest("hex")).toString(16);
  saveToDB(longURL, shortURL);
  return shortURL;
}

function load(shortURL: string) {
  // TODO: url 需要 decodeURI
  return loadToDB(shortURL);
}

// TODO: 使用 DB 持久化
function saveToDB(longURL: string, shortURL: string) {
  L2S[longURL] = shortURL;
  S2L[shortURL] = longURL;
}

function loadToDB(shortURL: string) {
  return S2L[shortURL];
}

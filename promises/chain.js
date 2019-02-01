const { promisify } = require("util");
const fs = require("fs");

const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const delay = sec =>
  new Promise((resolves, reject) =>
    setTimeout(() => {
      resolves(sec);
    }, sec * 1000)
  );

const doStuffSeq = () =>
  Promise.resolve()
    .then(() => console.log("Start"))
    .then(() => delay(1))
    .then(() => console.log("After wait 1 second"))
    .then(() => writeFile("file.txt", "Hi i'm file's content"))
    .then(() => console.log("file.txt created"))
    .then(() => delay(2))
    .then(() => console.log("After wait 2 seconds"))
    .then(() => readFile("file.txt"))
    .then(content => console.log(`file.txt: ${content}`))
    .then(() => delay(1))
    .then(() => console.log("After wait 1 seconds"))
    .then(() => unlink("file.txt"))
    .then(() => console.log("file.txt removed"))
    .then(() => console.log("Done"))
    .catch(console.log);

doStuffSeq();

function delayValue(sec, value) {
  return new Promise((resolves, rejects) => {
    setTimeout(() => {
      resolves(value);
    }, sec * 1000);
  });
}

console.log("Start");

delayValue(3, "Hello after 3 sec").then(console.log);
console.log("End");

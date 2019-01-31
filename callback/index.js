function delay(sec, cb) {
  setTimeout(cb, sec * 1000);
}

console.log("Start");
delay(1, () => {
  console.log("One");

  delay(1, () => {
    console.log("Two");
  });
});
console.log("End");

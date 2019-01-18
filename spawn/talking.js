const saying = ["Hello", "I'm", "the", "best", "swimmer"];

var interval = setInterval(() => {
  var i = Math.floor(Math.random() * saying.length);
  process.stdout.write(`${saying[i]} \n`);
}, 1000);

process.stdin.on("data", data => {
  if (data.toString().trim() == "stop") {
    console.log(`STDIN Data Recieved -> ${data.toString().trim()}`);
    clearInterval(interval);
    process.exit();
  } else {
    process.stdout.write(`${data.toString().trim()}`);
  }
});

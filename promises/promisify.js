const { promisify } = require("util");

function delayValue(sec, value, cb) {
  if (sec > 4) {
    cb(new Error(`${4} seconds is too long`));
  } else {
    setTimeout(() => {
      cb(value);
    }, sec * 1000);
  }
}
const promiseDelayValue = promisify(delayValue);

promiseDelayValue(3, "Hello after 3 sec")
  .then(console.log)
  .catch(err => console.log(err));

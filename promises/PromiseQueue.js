class PromiseQueue {
  constructor(promises = [], concurrent = 1) {
    this.concurrent = concurrent;
    this.promises = promises;
    this.runningTask = 0;
    this.complete = 0;
  }

  get runNextTask() {
    return (
      this.runningTask.length < this.concurrent && this.promises.length != 0
    );
  }

  run() {
    while (this.runNextTask) {
      const promise = this.promises.shift();
      this.runningTask++;
      promise.then(() => {
        this.runningTask--;
        this.complete++;
        this.run();
      });
    }
  }
}

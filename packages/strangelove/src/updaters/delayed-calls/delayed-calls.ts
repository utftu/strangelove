import {createControlledPromise} from 'utftu';
type BatchExec = () => void | Promise<void>;

type Batch = (fn: BatchExec) => void | Promise<void>;
const noop = (fn: BatchExec) => fn();

export class DelayedCalls {
  static new(batch: Batch = noop) {
    return new DelayedCalls(batch);
  }
  private batch: Batch;
  constructor(batch: Batch = noop) {
    this.batch = batch;
  }
  private calls = new Map();
  private promise: Promise<unknown> | null = null;
  private promiseControls:
    | ReturnType<typeof createControlledPromise>[1]
    | null = null;
  add(name: any, callback: BatchExec) {
    this.calls.set(name, callback);
    if (!this.promise) {
      const [promise, promiseControls] = createControlledPromise();
      this.promise = promise;
      this.promiseControls = promiseControls;
      Promise.resolve().then(async () => {
        await this.call();
        this.promiseControls!.resolve();
        this.calls.clear();
        this.promise = null;
        this.promiseControls = null;
      });
    }
    return this.promise;
  }
  private call() {
    return this.batch(() => {
      for (const cb of this.calls.values()) {
        cb();
      }
    });
  }
}

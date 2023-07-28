function a(cb) {
    const cbResult = cb();
    if (cbResult instanceof Promise) {
        return Promise.resolve(42);
    }
    else {
        return 42;
    }
}
const b = a(async (get) => get(42));
export {};

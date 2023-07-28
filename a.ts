import {number} from 'astro/zod';

function a<TCb extends (...args) => any>(
  cb: TCb,
): ReturnType<TCb> extends Promise<infer TResutl> ? any : any {
  const cbResult = cb();

  if (cbResult instanceof Promise) {
    return Promise.resolve(42) as any;
  } else {
    return 42;
  }
}

const b = a(async (get) => get(42));

import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

await import(path.join(__dirname, '../packages/strangelove/build.js'));
await import(path.join(__dirname, '../packages/strangelove-react/build.js'));

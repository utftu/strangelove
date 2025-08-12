import { Group, publishPackage, startIfMain, Task } from "dapes";

const types = new Task({
  name: "types",
  exec: async ({ command }) => {
    await command("npm run types");
  },
});

const build = new Task({
  parents: [types],
  name: "build",
  exec: async ({ command }) => {
    await command("npm run build");
  },
});

const publish = new Task({
  parents: [build],
  name: "publish",
  beforeExec: async ({ command }) => {
    await command("rm -rf dist");
  },
  exec: async (ctx) => {
    await publishPackage({
      ctx,
    });
  },
});

const group = new Group({
  name: "",
  tasks: [build, publish],
});

startIfMain(group, import.meta);

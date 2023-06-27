const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNote } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Npte title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    const notes = await printNote();
    console.log("notes", notes);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  handler(id) {
    removeNote(id);
  },
});

yargs.parse();
// код выполнен на node js
const http = require("http");
const chalk = require("chalk");
const port = 3000;
const fs = require("fs/promises");
const path = require("path");
const { addNote } = require("./notes.controller");

const basePath = path.join(__dirname, "pages");

const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.html"));
    // res.setHeader("Content-Type", "text/html");
    res.writeHead(200, { "Content-Type": "text/html ; charset=utf-8" });
    res.end(content);
  } else if (req.method === "POST") {
    const body = [];

    req.on("data", (data) => {
      body.push(Buffer.from(data));
    });
    req.on("end", () => {
      const title = body.toString().split("=")[1].replaceAll("+", " ");
      addNote(title);
      res.end(`Title = ${title}`);
    });
  }
  // console.log("Request method:", req.method);
  // console.log("Request url:", req.url);
  // res.end("Hello from server!!!");
});

server.listen(port, () => {
  console.log(chalk.green(`Server has bin started on port ${port}...`));
});

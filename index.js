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
  build: {
    id: {
      type: 'string',
      describle: 'note id',
      demandOption: true
    }
  },
  handler(id) {
    removeNote(id);
  },
});

yargs.parse();

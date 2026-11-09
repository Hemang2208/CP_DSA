// Topic: Directory Structure Simulation
// Concept: A directory is a collection of entries mapping names to files or subdirectories.
// It supports lookup, insertion, deletion, and listing.
// Use: Organizing files in a hierarchical namespace.
// Time: O(entries) per directory operation. Space: O(total entries).

class Directory {
    constructor(name) {
        this.name = name;
        this.entries = new Map();
    }

    pathOf(name) {
        return this.name === "/" ? `/${name}` : `${this.name}/${name}`;
    }

    addFile(name, size) {
        if (this.entries.has(name)) {
            console.log(`${this.pathOf(name)}: already exists`);
            return;
        }
        this.entries.set(name, { type: "file", size });
        console.log(`${this.pathOf(name)}: file created (${size} KB)`);
    }

    addDirectory(name) {
        if (this.entries.has(name)) {
            console.log(`${this.pathOf(name)}: already exists`);
            return null;
        }
        const directory = new Directory(name);
        this.entries.set(name, { type: "dir", directory });
        console.log(`${this.pathOf(name)}: directory created`);
        return directory;
    }

    remove(name) {
        if (!this.entries.delete(name)) {
            console.log(`${this.pathOf(name)}: not found`);
            return;
        }
        console.log(`${this.pathOf(name)}: removed`);
    }

    list() {
        console.log(`Contents of ${this.name}:`);
        for (const [name, entry] of this.entries) {
            console.log(`  ${name} (${entry.type}${entry.type === "file" ? `, ${entry.size} KB` : ""})`);
        }
    }
}

const root = new Directory("/");
console.log("Directory Structure Simulation");
root.addFile("readme.txt", 4);
const home = root.addDirectory("home");
const user = home.addDirectory("user");
user.addFile("notes.txt", 10);
user.addFile("todo.md", 2);
root.addDirectory("etc");
root.list();
home.list();
user.list();
user.remove("todo.md");
user.list();

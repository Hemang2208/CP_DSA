// Topic: File Creation, Reading, Writing and Deletion
// Concept: A file system maps names to file objects containing data and metadata.
// CRUD operations create, read, update, and remove those objects.
// Use: Every user-level file API and storage service.
// Time: O(1) average per operation with a hash map. Space: O(total file data).

class FileSystem {
    constructor() {
        this.files = new Map();
    }

    create(name) {
        if (this.files.has(name)) {
            console.log(`create ${name}: already exists`);
            return false;
        }
        this.files.set(name, { name, content: "", size: 0 });
        console.log(`create ${name}: created`);
        return true;
    }

    write(name, content) {
        const file = this.files.get(name);
        if (!file) {
            console.log(`write ${name}: file not found`);
            return;
        }
        file.content = content;
        file.size = content.length;
        console.log(`write ${name}: stored ${file.size} bytes`);
    }

    read(name) {
        const file = this.files.get(name);
        if (!file) {
            console.log(`read ${name}: file not found`);
            return null;
        }
        console.log(`read ${name}: "${file.content}"`);
        return file.content;
    }

    remove(name) {
        if (!this.files.delete(name)) {
            console.log(`delete ${name}: file not found`);
            return;
        }
        console.log(`delete ${name}: deleted`);
    }

    list() {
        console.log("Files:", [...this.files.keys()].join(", ") || "none");
    }
}

const fs = new FileSystem();
console.log("File CRUD Simulation");
fs.create("notes.txt");
fs.write("notes.txt", "Operating Systems");
fs.read("notes.txt");
fs.create("notes.txt");
fs.create("data.bin");
fs.write("data.bin", "101010");
fs.list();
fs.remove("notes.txt");
fs.read("notes.txt");
fs.list();

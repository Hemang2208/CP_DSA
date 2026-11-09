// Topic: Two-Level Directory
// Concept: A master directory contains one directory per user. Each user directory contains
// that user's files, so different users may reuse the same file name.
// Use: Multi-user systems with simple per-user isolation.
// Time: O(users + files per user). Space: O(total files).

class TwoLevelDirectory {
    constructor() {
        this.users = new Map();
    }

    createUser(user) {
        if (this.users.has(user)) {
            console.log(`User ${user} already exists`);
            return;
        }
        this.users.set(user, new Map());
        console.log(`User ${user} created`);
    }

    createFile(user, fileName) {
        if (!this.users.has(user)) {
            console.log(`User ${user} not found`);
            return;
        }
        const files = this.users.get(user);
        if (files.has(fileName)) {
            console.log(`${user}/${fileName} already exists`);
            return;
        }
        files.set(fileName, { name: fileName, size: 0 });
        console.log(`${user}/${fileName} created`);
    }

    writeFile(user, fileName, content) {
        const files = this.users.get(user);
        if (!files || !files.has(fileName)) {
            console.log(`${user}/${fileName} not found`);
            return;
        }
        files.get(fileName).size = content.length;
        console.log(`${user}/${fileName} now has ${content.length} bytes`);
    }

    list() {
        for (const [user, files] of this.users) {
            console.log(`\n/${user}:`);
            for (const file of files.values()) {
                console.log(`  ${file.name} (${file.size} bytes)`);
            }
        }
    }
}

const fs = new TwoLevelDirectory();
console.log("Two-Level Directory Simulation");
fs.createUser("alice");
fs.createUser("bob");
fs.createFile("alice", "notes.txt");
fs.createFile("bob", "notes.txt");
fs.writeFile("alice", "notes.txt", "alice data");
fs.writeFile("bob", "notes.txt", "bob data");
fs.list();
console.log("\nSame file name is allowed because each user has a separate directory.");

// Topic: Single-Level Directory
// Concept: All files live in one directory. Names must be unique, and there is no
// grouping or hierarchy.
// Use: Simple embedded systems and early file systems.
// Time: O(n) to search n entries. Space: O(n).

const directory = new Map();

function create(name, owner) {
    if (directory.has(name)) {
        console.log(`create ${name}: name collision with existing file`);
        return false;
    }
    directory.set(name, { name, owner, size: 0 });
    console.log(`create ${name}: owned by ${owner}`);
    return true;
}

function write(name, data) {
    const file = directory.get(name);
    if (!file) {
        console.log(`write ${name}: not found`);
        return;
    }
    file.size = data.length;
    console.log(`write ${name}: ${file.size} bytes`);
}

function list() {
    console.log("Single-Level Directory:");
    for (const file of directory.values()) {
        console.log(`  ${file.name} (owner=${file.owner}, size=${file.size})`);
    }
}

console.log("Single-Level Directory Simulation");
create("report.txt", "alice");
create("photo.jpg", "bob");
create("report.txt", "charlie");
write("report.txt", "quarterly results");
list();

console.log("\nProblem: unrelated users share one namespace.");
console.log("A two-level directory gives each user a private namespace.");

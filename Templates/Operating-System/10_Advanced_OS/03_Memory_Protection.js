// Topic: Memory Protection
// Concept: Base and limit registers define a process's legal address range. Permission bits
// control whether reads, writes, or executes are allowed.
// Use: Preventing processes from accessing each other's memory or read-only code.
// Time: O(1) per access check. Space: O(1).

const process = {
    pid: "P1",
    base: 1000,
    limit: 500,
    permissions: ["read", "write"],
    memory: new Array(500).fill(0)
};

function accessMemory(pid, address, type) {
    if (pid !== process.pid) {
        console.log(`${pid}: access denied, process not scheduled`);
        return false;
    }

    if (address < process.base || address >= process.base + process.limit) {
        console.log(`${pid}: address ${address} -> SEGMENTATION FAULT (outside base/limit)`);
        return false;
    }

    if (!process.permissions.includes(type)) {
        console.log(`${pid}: address ${address} -> PROTECTION FAULT (${type} not allowed)`);
        return false;
    }

    const offset = address - process.base;
    console.log(`${pid}: ${type} at ${address} -> offset ${offset} allowed`);
    return true;
}

console.log("Memory Protection");
console.log(`Base=${process.base}, Limit=${process.limit}, Permissions=${process.permissions.join("/")}`);
accessMemory("P1", 1000, "read");
accessMemory("P1", 1200, "write");
accessMemory("P1", 900, "read");
accessMemory("P1", 1600, "read");
accessMemory("P2", 1100, "read");

process.permissions = ["read"];
console.log("\nCode page made read-only:");
accessMemory("P1", 1100, "write");
accessMemory("P1", 1100, "read");

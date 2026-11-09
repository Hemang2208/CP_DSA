// Topic: File Allocation - Contiguous
// Concept: Each file occupies a contiguous range of disk blocks. The directory stores the
// starting block and length, so access is fast but external fragmentation can occur.
// Use: Simple file systems and read-only media.
// Time: O(diskSize) to find a run. Space: O(diskSize).

const diskSize = 20;
const disk = new Array(diskSize).fill(null);
const files = [
    { name: "a.txt", blocks: 3 },
    { name: "b.bin", blocks: 5 },
    { name: "c.log", blocks: 2 },
    { name: "d.dat", blocks: 6 }
];

function allocateContiguous(name, size) {
    let runStart = -1;
    let runLength = 0;

    for (let i = 0; i < diskSize; i++) {
        if (disk[i] === null) {
            if (runLength === 0) runStart = i;
            runLength++;
            if (runLength === size) {
                for (let j = runStart; j < runStart + size; j++) disk[j] = name;
                return { start: runStart, length: size };
            }
        } else {
            runLength = 0;
        }
    }

    return null;
}

console.log("Contiguous File Allocation");
const directory = [];
for (const file of files) {
    const result = allocateContiguous(file.name, file.blocks);
    if (!result) {
        console.log(`${file.name}: allocation failed`);
        continue;
    }
    directory.push({ name: file.name, ...result });
    console.log(`${file.name}: blocks ${result.start}-${result.start + result.length - 1}`);
}

console.log("\nDirectory:");
console.table(directory);
console.log("Disk:", disk.map((block) => block || ".").join(" "));

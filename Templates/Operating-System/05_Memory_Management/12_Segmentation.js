// Topic: Segmentation
// Concept: A program is divided into variable-sized logical segments such as code, data,
// stack, and heap. Each segment has a base address and a limit.
// Use: Memory protection and logical program organization.
// Time: O(1) per address translation. Space: O(number of segments).

const segments = [
    { id: 0, name: "code", base: 1000, limit: 400 },
    { id: 1, name: "data", base: 2000, limit: 300 },
    { id: 2, name: "stack", base: 5000, limit: 500 },
    { id: 3, name: "heap", base: 7000, limit: 800 }
];

function translate(segmentId, offset) {
    const segment = segments[segmentId];

    if (!segment) {
        return `segment ${segmentId} does not exist`;
    }

    if (offset >= segment.limit) {
        return `SEGMENTATION FAULT: offset ${offset} >= limit ${segment.limit}`;
    }

    return `physical address ${segment.base + offset} (${segment.name})`;
}

console.log("Segmentation Address Translation");
const requests = [
    [0, 120],
    [1, 299],
    [1, 350],
    [2, 499],
    [3, 800],
    [4, 10]
];

for (const [segmentId, offset] of requests) {
    console.log(`Segment ${segmentId}, offset ${offset} -> ${translate(segmentId, offset)}`);
}

console.log("\nSegments have different sizes; the limit register protects neighboring segments.");

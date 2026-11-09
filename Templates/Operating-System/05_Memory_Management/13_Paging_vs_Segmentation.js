// Topic: Paging vs Segmentation
// Concept: Paging uses fixed-size pages and frames, while segmentation uses variable-sized
// logical segments. Paging removes external fragmentation; segmentation matches program structure.
// Use: Choosing or combining memory-management schemes in an OS.
// Time: O(1) per translation for both. Space: page table or segment table.

const comparison = [
    { Feature: "Unit size", Paging: "Fixed pages/frames", Segmentation: "Variable segments" },
    { Feature: "Fragmentation", Paging: "Internal", Segmentation: "External" },
    { Feature: "Program view", Paging: "Invisible to programmer", Segmentation: "Visible logical units" },
    { Feature: "Address", Paging: "Page number + offset", Segmentation: "Segment number + offset" },
    { Feature: "Table", Paging: "Page table", Segmentation: "Segment table (base + limit)" },
    { Feature: "Protection", Paging: "Per page", Segmentation: "Per segment" },
    { Feature: "Sharing", Paging: "Page granularity", Segmentation: "Segment granularity" }
];

console.log("Paging vs Segmentation");
console.table(comparison);

console.log("\nPaging example: page 2, offset 100 -> frame 8");
const pageSize = 1024;
const pageNumber = 2;
const offset = 100;
const frame = 8;
console.log(`Physical address = ${frame * pageSize + offset}`);

console.log("\nSegmentation example: segment 1 (base 2000, limit 300), offset 120");
console.log(`Physical address = ${2000 + 120}`);
console.log("Segment offset 350 would raise a segmentation fault because 350 >= 300.");

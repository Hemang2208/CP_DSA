// Topic: Logical to Physical Address Translation
// Concept: A logical address is split into a page number and an offset. The page table
// converts the page number to a frame number, and the offset is added to the frame base.
// Use: Every memory access in a paged virtual-memory system.
// Time: O(1). Space: O(number of pages).

const pageSize = 2048;
const pageTable = [4, 1, 7, 2, 9, 0, 3, 6];
const logicalAddresses = [0, 2047, 2048, 5000, 10000, 16383];

function translate(address) {
    const pageNumber = Math.floor(address / pageSize);
    const offset = address % pageSize;

    if (pageNumber >= pageTable.length) {
        return { error: `page ${pageNumber} outside page table` };
    }

    const frameNumber = pageTable[pageNumber];
    const physicalAddress = frameNumber * pageSize + offset;
    return { pageNumber, offset, frameNumber, physicalAddress };
}

console.log(`Address Translation (page size = ${pageSize})`);
for (const address of logicalAddresses) {
    const result = translate(address);

    if (result.error) {
        console.log(`Logical ${address}: ${result.error}`);
        continue;
    }

    console.log(`Logical ${address} -> page ${result.pageNumber}, offset ${result.offset} -> frame ${result.frameNumber} -> physical ${result.physicalAddress}`);
}

console.log("\nFormula: physical = frameNumber * pageSize + offset");

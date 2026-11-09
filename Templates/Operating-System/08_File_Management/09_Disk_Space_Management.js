// Topic: Disk Space Management
// Concept: The file system tracks which disk blocks are allocated and which are free.
// A bitmap uses one bit per block; 1 means allocated and 0 means free.
// Use: Allocating and reclaiming blocks for files.
// Time: O(diskBlocks) per scan. Space: O(diskBlocks) bits.

class DiskBitmap {
    constructor(blocks) {
        this.blocks = blocks;
        this.bitmap = new Array(blocks).fill(0);
    }

    allocate(count) {
        const allocated = [];

        for (let i = 0; i < this.blocks && allocated.length < count; i++) {
            if (this.bitmap[i] === 0) {
                this.bitmap[i] = 1;
                allocated.push(i);
            }
        }

        if (allocated.length < count) {
            console.log(`Not enough free blocks for ${count} blocks; rolling back`);
            for (const block of allocated) this.bitmap[block] = 0;
            return [];
        }

        console.log(`Allocated blocks: [${allocated.join(", ")}]`);
        return allocated;
    }

    free(blocks) {
        for (const block of blocks) {
            this.bitmap[block] = 0;
        }
        console.log(`Freed blocks: [${blocks.join(", ")}]`);
    }

    display() {
        console.log(`Bitmap: ${this.bitmap.join("")}`);
        const used = this.bitmap.filter((bit) => bit === 1).length;
        console.log(`Used: ${used}, Free: ${this.blocks - used}`);
    }
}

const disk = new DiskBitmap(24);
console.log("Disk Space Management with a Bitmap");
disk.display();
const fileA = disk.allocate(4);
const fileB = disk.allocate(3);
disk.display();
disk.free(fileA);
disk.display();
disk.allocate(2);
disk.display();

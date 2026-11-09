// Topic: Buddy Memory Allocation
// Concept: Memory is split into power-of-two blocks. A request is rounded up to a power of
// two, and larger blocks are repeatedly split in half. Freeing merges buddy blocks.
// Use: Kernel memory allocators that need fast allocation and coalescing.
// Time: O(log totalSize) per allocate/free. Space: O(totalSize).

class BuddyAllocator {
    constructor(totalSize) {
        this.totalSize = totalSize;
        this.blocks = [{ start: 0, size: totalSize, free: true, pid: null }];
    }

    allocate(pid, size) {
        let need = 1;
        while (need < size) need *= 2;

        const candidates = this.blocks
            .filter((block) => block.free && block.size >= need)
            .sort((a, b) => a.size - b.size);

        if (candidates.length === 0) {
            console.log(`${pid}: allocation of ${size} failed`);
            return false;
        }

        const block = candidates[0];
        while (block.size > need) {
            const half = block.size / 2;
            block.size = half;
            this.blocks.push({ start: block.start + half, size: half, free: true, pid: null });
        }

        block.free = false;
        block.pid = pid;
        console.log(`${pid}: allocated ${need} units at ${block.start}`);
        return true;
    }

    free(pid) {
        const block = this.blocks.find((item) => item.pid === pid);
        if (!block) {
            console.log(`${pid}: no allocation found`);
            return;
        }

        block.free = true;
        block.pid = null;
        console.log(`${pid}: freed block at ${block.start} (size ${block.size})`);
        this.merge();
    }

    merge() {
        let merged = true;

        while (merged) {
            merged = false;

            for (const block of this.blocks) {
                if (!block.free) continue;

                const buddyStart = block.start ^ block.size;
                const buddy = this.blocks.find(
                    (item) => item.start === buddyStart && item.size === block.size && item.free
                );

                if (buddy && buddy !== block) {
                    const start = Math.min(block.start, buddy.start);
                    block.start = start;
                    block.size *= 2;
                    this.blocks.splice(this.blocks.indexOf(buddy), 1);
                    console.log(`Merged buddies into block at ${block.start} (size ${block.size})`);
                    merged = true;
                    break;
                }
            }
        }
    }

    display() {
        console.log("\nBuddy Blocks:");
        console.table(this.blocks
            .sort((a, b) => a.start - b.start)
            .map((block) => ({
                Start: block.start,
                Size: block.size,
                Owner: block.free ? "FREE" : block.pid
            })));
    }
}

const allocator = new BuddyAllocator(64);
console.log("Buddy Memory Allocation");
allocator.allocate("P1", 8);
allocator.allocate("P2", 16);
allocator.allocate("P3", 6);
allocator.display();
allocator.free("P1");
allocator.free("P2");
allocator.display();
allocator.allocate("P4", 20);
allocator.display();

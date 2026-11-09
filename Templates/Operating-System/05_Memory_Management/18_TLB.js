// Topic: Translation Lookaside Buffer (TLB)
// Concept: A TLB is a small, fast cache of recent page-to-frame translations. A TLB hit
// avoids a full page-table lookup.
// Use: Speeding up virtual-address translation.
// Time: O(TLB size) for a simple search, O(1) with hardware. Space: O(TLB size).

class TLB {
    constructor(size) {
        this.size = size;
        this.entries = [];
        this.hits = 0;
        this.misses = 0;
    }

    lookup(page) {
        const entry = this.entries.find((item) => item.page === page);

        if (entry) {
            this.hits++;
            console.log(`Page ${page}: TLB HIT -> frame ${entry.frame}`);
            return entry.frame;
        }

        this.misses++;
        console.log(`Page ${page}: TLB MISS -> walk page table`);
        return null;
    }

    insert(page, frame) {
        if (this.entries.length === this.size) {
            const evicted = this.entries.shift();
            console.log(`  TLB full, evicted page ${evicted.page}`);
        }
        this.entries.push({ page, frame });
        console.log(`  TLB updated: page ${page} -> frame ${frame}`);
    }

    display() {
        console.log("TLB contents:", this.entries.map((e) => `${e.page}->${e.frame}`).join(", ") || "empty");
    }
}

const pageTable = { 0: 4, 1: 7, 2: 1, 3: 9, 4: 2, 5: 6 };
const tlb = new TLB(3);
const references = [0, 1, 0, 2, 0, 1, 3, 2, 0, 4, 1, 2];

console.log("TLB Simulation");
for (const page of references) {
    let frame = tlb.lookup(page);

    if (frame === null) {
        frame = pageTable[page];
        console.log(`  Page table says page ${page} -> frame ${frame}`);
        tlb.insert(page, frame);
    }

    console.log(`  Access page ${page} using frame ${frame}`);
    tlb.display();
}

const total = tlb.hits + tlb.misses;
console.log(`\nTLB hits: ${tlb.hits}`);
console.log(`TLB misses: ${tlb.misses}`);
console.log(`Hit ratio: ${((tlb.hits / total) * 100).toFixed(2)}%`);

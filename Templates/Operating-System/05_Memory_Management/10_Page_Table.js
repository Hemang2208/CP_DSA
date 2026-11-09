// Topic: Page Table Implementation
// Concept: A page table maps each logical page to a physical frame and stores control bits
// such as valid, dirty, referenced, and protection.
// Use: Address translation and virtual-memory management.
// Time: O(1) lookup. Space: O(number of pages).

class PageTable {
    constructor(pageCount) {
        this.entries = Array.from({ length: pageCount }, (_, page) => ({
            page,
            frame: null,
            valid: false,
            dirty: false,
            referenced: false,
            protection: "RW"
        }));
    }

    map(page, frame, protection = "RW") {
        const entry = this.entries[page];
        entry.frame = frame;
        entry.valid = true;
        entry.protection = protection;
        console.log(`Mapped page ${page} -> frame ${frame} (${protection})`);
    }

    unmap(page) {
        const entry = this.entries[page];
        entry.valid = false;
        entry.frame = null;
        console.log(`Unmapped page ${page}`);
    }

    access(page, write = false) {
        const entry = this.entries[page];
        if (!entry.valid) {
            console.log(`Page ${page}: PAGE FAULT (valid bit = 0)`);
            return null;
        }

        if (write && entry.protection === "R") {
            console.log(`Page ${page}: PROTECTION FAULT (read-only)`);
            return null;
        }

        entry.referenced = true;
        if (write) entry.dirty = true;
        console.log(`Page ${page}: access OK, frame ${entry.frame}${write ? ", dirty set" : ""}`);
        return entry.frame;
    }

    display() {
        console.table(this.entries.map((entry) => ({
            Page: entry.page,
            Frame: entry.frame,
            Valid: entry.valid,
            Dirty: entry.dirty,
            Referenced: entry.referenced,
            Protection: entry.protection
        })));
    }
}

const table = new PageTable(4);
console.log("Page Table Implementation");
table.map(0, 5);
table.map(1, 2, "R");
table.map(2, 8);

table.access(0);
table.access(1, true);
table.access(2, true);
table.access(3);
table.unmap(2);
table.access(2);
table.display();

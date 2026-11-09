// Topic: Memory-Mapped File
// Concept: A file is mapped into a process's virtual address space. Page accesses load file
// data on demand, and writes mark pages dirty until they are flushed back to the file.
// Use: Fast file I/O, shared libraries, and databases.
// Time: O(1) per page access, O(page size) per flush. Space: O(mapped pages).

class MemoryMappedFile {
    constructor(fileName, pages) {
        this.fileName = fileName;
        this.filePages = pages;
        this.mapping = pages.map((content, index) => ({
            page: index,
            content,
            resident: false,
            dirty: false
        }));
        this.faults = 0;
    }

    access(page, write = false, newContent = null) {
        const entry = this.mapping[page];

        if (!entry.resident) {
            this.faults++;
            entry.resident = true;
            console.log(`Page ${page}: fault, loaded "${entry.content}" from ${this.fileName}`);
        } else {
            console.log(`Page ${page}: resident, content "${entry.content}"`);
        }

        if (write) {
            entry.content = newContent;
            entry.dirty = true;
            console.log(`Page ${page}: modified to "${newContent}" (dirty)`);
        }

        return entry.content;
    }

    flush() {
        console.log(`\nFlushing dirty pages to ${this.fileName}`);
        for (const entry of this.mapping) {
            if (entry.dirty) {
                console.log(`  write page ${entry.page}: "${entry.content}"`);
                entry.dirty = false;
            }
        }
    }

    display() {
        console.table(this.mapping.map((entry) => ({
            Page: entry.page,
            Content: entry.content,
            Resident: entry.resident,
            Dirty: entry.dirty
        })));
    }
}

const mapped = new MemoryMappedFile("database.db", ["header", "index", "row-1", "row-2"]);
console.log("Memory-Mapped File");
mapped.access(0);
mapped.access(2);
mapped.access(2, true, "row-1-updated");
mapped.access(1);
mapped.flush();
mapped.display();
console.log(`Page faults: ${mapped.faults}`);

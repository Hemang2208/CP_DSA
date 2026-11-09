// Topic: Copy-on-Write (COW)
// Concept: After fork, parent and child share physical pages read-only. A write to a shared
// page triggers a private copy, preserving isolation while avoiding unnecessary copying.
// Use: Fast process creation and memory-efficient snapshots.
// Time: O(1) per page fault, O(page size) per copy. Space: O(shared pages).

class Page {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.refCount = 1;
        this.shared = false;
        this.owner = "parent";
    }
}

const pages = [new Page(0, "code"), new Page(1, "data"), new Page(2, "heap")];
pages.forEach((page) => {
    page.refCount = 2;
    page.shared = true;
    page.owner = "parent+child";
});

console.log("Copy-on-Write after fork");
console.log("Shared pages:", pages.map((p) => `P${p.id}:${p.data}(refs=${p.refCount})`).join(", "));

function write(process, pageId, newData) {
    const page = pages[pageId];

    if (page.shared) {
        console.log(`${process}: write to shared page ${pageId} -> COPY`);
        page.shared = false;
        page.refCount--;
        page.owner = process === "child" ? "parent" : "child";
        const copy = new Page(pageId + 10, newData);
        copy.owner = process;
        pages.push(copy);
        console.log(`  Created private page ${copy.id} for ${process}: ${copy.data}`);
    } else {
        page.data = newData;
        console.log(`${process}: page ${pageId} was private, updated in place to ${newData}`);
    }
}

write("child", 1, "child-data");
write("parent", 1, "parent-data");

console.log("\nFinal pages:");
console.table(pages.map((page) => ({
    Page: page.id,
    Data: page.data,
    Owner: page.owner,
    RefCount: page.refCount,
    Shared: page.shared
})));

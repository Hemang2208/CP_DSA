// Topic: Journaling File System
// Concept: Metadata changes are first written to a journal. After a commit record, changes
// are applied to the real file system. After a crash, the journal is replayed.
// Use: Fast recovery and consistency in ext4, NTFS, and XFS.
// Time: O(transactions) for logging and replay. Space: O(journal size).

class Journal {
    constructor() {
        this.entries = [];
        this.committed = false;
    }

    begin(transactionId) {
        this.entries = [];
        this.committed = false;
        console.log(`Transaction ${transactionId}: BEGIN`);
    }

    log(operation) {
        this.entries.push(operation);
        console.log(`  journal: ${operation}`);
    }

    commit(transactionId) {
        this.committed = true;
        console.log(`Transaction ${transactionId}: COMMIT`);
    }

    replay() {
        if (!this.committed) {
            console.log("Journal incomplete: discard uncommitted entries");
            return;
        }

        console.log("Replaying committed journal:");
        for (const operation of this.entries) {
            console.log(`  apply ${operation}`);
        }
    }
}

const journal = new Journal();
console.log("Journaling File System");
journal.begin("T1");
journal.log("create inode 42");
journal.log("update directory /home/user");
journal.log("write data block 100");
journal.commit("T1");
journal.replay();

console.log("\nSimulating a crash before commit:");
journal.begin("T2");
journal.log("delete inode 42");
journal.log("update directory /home/user");
console.log("CRASH before commit");
journal.replay();

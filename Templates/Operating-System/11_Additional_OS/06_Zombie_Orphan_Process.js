// Topic: Zombie and Orphan Processes
// Concept: A zombie is a terminated child whose exit status has not been collected by its
// parent. An orphan is a child whose parent terminated first; init adopts it.
// Use: Process lifecycle management and avoiding resource leaks.
// Time: O(1) per event. Space: O(processes).

class ProcessTable {
    constructor() {
        this.processes = new Map();
    }

    create(pid, parent, state = "RUNNING") {
        this.processes.set(pid, { pid, parent, state });
        console.log(`Created P${pid} with parent P${parent} (${state})`);
    }

    exit(pid) {
        const process = this.processes.get(pid);
        process.state = "ZOMBIE";
        console.log(`P${pid} exited; state = ZOMBIE (waiting for parent to collect status)`);
    }

    wait(parentPid, childPid) {
        const child = this.processes.get(childPid);
        if (!child || child.parent !== parentPid) {
            console.log(`P${parentPid} cannot wait for P${childPid}`);
            return;
        }
        this.processes.delete(childPid);
        console.log(`P${parentPid} collected P${childPid}; zombie removed`);
    }

    orphan(pid) {
        const process = this.processes.get(pid);
        process.parent = 1;
        process.state = "ORPHAN";
        console.log(`P${pid} became an orphan; adopted by init (P1)`);
    }

    display() {
        console.log("\nProcess table:");
        console.table([...this.processes.values()]);
    }
}

const table = new ProcessTable();
console.log("Zombie and Orphan Processes");
table.create(100, 1);
table.create(101, 100);
table.create(102, 100);
table.exit(101);
table.display();
table.wait(100, 101);
table.display();
table.exit(100);
table.orphan(102);
table.display();

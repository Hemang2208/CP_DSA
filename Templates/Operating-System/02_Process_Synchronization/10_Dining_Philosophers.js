// Topic: Dining Philosophers Problem
// Concept: Five philosophers share five forks. A philosopher needs both adjacent forks to eat.
// Resource ordering (always pick the lower-numbered fork first) prevents circular wait.
// Use: Modeling deadlock and resource-ordering solutions in concurrent systems.
// Time: O(n) for n philosophers. Space: O(n).

class Fork {
    constructor(id) {
        this.id = id;
        this.owner = null;
    }

    acquire(pid) {
        if (this.owner !== null) {
            console.log(`  ${pid} cannot take fork ${this.id}, owned by ${this.owner}`);
            return false;
        }
        this.owner = pid;
        console.log(`  ${pid} takes fork ${this.id}`);
        return true;
    }

    release(pid) {
        if (this.owner === pid) {
            this.owner = null;
            console.log(`  ${pid} releases fork ${this.id}`);
        }
    }
}

const forks = Array.from({ length: 5 }, (_, i) => new Fork(i));

function dine(philosopher) {
    const left = philosopher;
    const right = (philosopher + 1) % 5;
    const first = Math.min(left, right);
    const second = Math.max(left, right);
    const pid = `P${philosopher}`;

    console.log(`${pid} is hungry (forks ${first} and ${second})`);
    if (!forks[first].acquire(pid)) return;
    if (!forks[second].acquire(pid)) {
        forks[first].release(pid);
        return;
    }

    console.log(`${pid} is EATING`);
    forks[second].release(pid);
    forks[first].release(pid);
    console.log(`${pid} is THINKING\n`);
}

console.log("Dining Philosophers with resource ordering");
for (let i = 0; i < 5; i++) {
    dine(i);
}

console.log("All philosophers ate without deadlock because fork order was consistent.");

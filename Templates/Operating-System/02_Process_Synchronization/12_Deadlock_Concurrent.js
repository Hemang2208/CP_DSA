// Topic: Deadlock in Concurrent Processes
// Concept: Deadlock occurs when processes hold resources and wait for resources held by
// each other, forming a circular wait.
// Use: Detecting unsafe resource ownership patterns in concurrent programs.
// Time: O(V + E) for wait-for graph cycle detection. Space: O(V + E).

const resources = {
    R1: { owner: null },
    R2: { owner: null }
};

const waitFor = {
    P1: [],
    P2: []
};

function acquire(pid, resource) {
    if (resources[resource].owner === null) {
        resources[resource].owner = pid;
        console.log(`${pid} acquires ${resource}`);
        return true;
    }

    console.log(`${pid} requests ${resource}, held by ${resources[resource].owner} -> blocked`);
    waitFor[pid].push(resources[resource].owner);
    return false;
}

function hasCycle(graph) {
    const visiting = new Set();
    const visited = new Set();

    function dfs(node) {
        if (visiting.has(node)) return true;
        if (visited.has(node)) return false;
        visiting.add(node);
        for (const next of graph[node] || []) {
            if (dfs(next)) return true;
        }
        visiting.delete(node);
        visited.add(node);
        return false;
    }

    return Object.keys(graph).some((node) => dfs(node));
}

console.log("Deadlock in Concurrent Processes");
acquire("P1", "R1");
acquire("P2", "R2");
acquire("P1", "R2");
acquire("P2", "R1");

console.log("\nWait-for graph:");
for (const pid of Object.keys(waitFor)) {
    console.log(`${pid} -> [${waitFor[pid].join(", ") || "none"}]`);
}

console.log(`\nCycle detected: ${hasCycle(waitFor)}`);
console.log("P1 waits for P2 and P2 waits for P1, so both are deadlocked.");

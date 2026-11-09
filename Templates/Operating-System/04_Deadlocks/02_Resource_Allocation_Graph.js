// Topic: Resource Allocation Graph (RAG)
// Concept: A directed graph has process and resource nodes. Assignment edges go resource -> process,
// request edges go process -> resource. A cycle indicates possible deadlock.
// Use: Visualizing resource ownership and detecting circular waits.
// Time: O(V + E) for cycle detection. Space: O(V + E).

const graph = {
    P1: ["R1"],
    P2: ["R2"],
    R1: ["P2"],
    R2: ["P1"]
};

console.log("Resource Allocation Graph");
for (const node of Object.keys(graph)) {
    for (const neighbor of graph[node]) {
        console.log(`${node} -> ${neighbor}`);
    }
}

function hasCycle(graph) {
    const color = {};

    function dfs(node) {
        color[node] = "gray";
        for (const next of graph[node] || []) {
            if (color[next] === "gray") return true;
            if (!color[next] && dfs(next)) return true;
        }
        color[node] = "black";
        return false;
    }

    return Object.keys(graph).some((node) => !color[node] && dfs(node));
}

const cycle = hasCycle(graph);
console.log(`\nCycle detected: ${cycle}`);
console.log("P1 requests R1, R1 is held by P2; P2 requests R2, R2 is held by P1.");
console.log("The cycle means the system is deadlocked in this example.");

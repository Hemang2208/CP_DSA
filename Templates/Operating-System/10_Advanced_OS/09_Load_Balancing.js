// Topic: Load Balancing Simulation
// Concept: A load balancer distributes work across nodes to avoid hotspots. Round robin is
// simple; least-loaded assignment adapts to current node load.
// Use: Web servers, cluster schedulers, and distributed computing.
// Time: O(tasks * nodes). Space: O(nodes).

const tasks = [5, 3, 7, 2, 4, 6, 1, 8];
const nodeCount = 3;

function roundRobin(tasks, nodeCount) {
    const nodes = Array.from({ length: nodeCount }, (_, id) => ({ id, load: 0 }));
    tasks.forEach((task, index) => {
        const node = nodes[index % nodeCount];
        node.load += task;
        console.log(`RR: task ${task} -> N${node.id} (load ${node.load})`);
    });
    return nodes;
}

function leastLoaded(tasks, nodeCount) {
    const nodes = Array.from({ length: nodeCount }, (_, id) => ({ id, load: 0 }));
    tasks.forEach((task) => {
        nodes.sort((a, b) => a.load - b.load);
        nodes[0].load += task;
        console.log(`LL: task ${task} -> N${nodes[0].id} (load ${nodes[0].load})`);
    });
    return nodes;
}

console.log("Load Balancing: Round Robin");
const rr = roundRobin(tasks, nodeCount);
console.log("Final loads:", rr.map((n) => `N${n.id}=${n.load}`).join(", "));
console.log(`Max-min difference: ${Math.max(...rr.map((n) => n.load)) - Math.min(...rr.map((n) => n.load))}`);

console.log("\nLoad Balancing: Least Loaded");
const ll = leastLoaded(tasks, nodeCount);
console.log("Final loads:", ll.map((n) => `N${n.id}=${n.load}`).join(", "));
console.log(`Max-min difference: ${Math.max(...ll.map((n) => n.load)) - Math.min(...ll.map((n) => n.load))}`);

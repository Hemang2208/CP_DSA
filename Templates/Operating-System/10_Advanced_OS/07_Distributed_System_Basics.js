// Topic: Distributed System Basics
// Concept: Independent nodes communicate by messages and cooperate without shared memory.
// A common task is detecting failures and electing a coordinator.
// Use: Clusters, cloud services, and distributed databases.
// Time: O(n) for n nodes. Space: O(n).

const nodes = [
    { id: 1, alive: true },
    { id: 2, alive: true },
    { id: 3, alive: true },
    { id: 4, alive: true },
    { id: 5, alive: false }
];

console.log("Distributed System Basics");
console.log("Nodes:", nodes.map((node) => `N${node.id}${node.alive ? "" : " (down)"}`).join(", "));

function electLeader(nodes) {
    const alive = nodes.filter((node) => node.alive);
    const leader = alive.reduce((best, node) => (node.id > best.id ? node : best), alive[0]);
    console.log(`Election messages sent to ${alive.length} alive nodes`);
    console.log(`Node N${leader.id} elected leader (highest ID among alive nodes)`);
    return leader;
}

const leader = electLeader(nodes);

console.log("\nHeartbeat check:");
for (const node of nodes) {
    if (!node.alive) {
        console.log(`N${node.id}: no heartbeat, marked failed`);
        continue;
    }
    console.log(`N${node.id}: heartbeat OK, sends status to N${leader.id}`);
}

console.log("\nDistributed systems must tolerate node failure and message delay.");

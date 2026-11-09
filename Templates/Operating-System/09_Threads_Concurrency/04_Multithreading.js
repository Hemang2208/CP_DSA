// Topic: Multithreading Simulation
// Concept: Multiple threads share a process's memory and run concurrently. Each thread has
// its own stack and program counter but shares code and data.
// Use: Responsive user interfaces, servers, and parallel data processing.
// Time: O(work) overall, with interleaved execution. Space: O(threads).

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function worker(id, steps) {
    console.log(`Thread ${id}: started`);
    for (let step = 1; step <= steps; step++) {
        await delay(10);
        console.log(`Thread ${id}: step ${step}/${steps}`);
    }
    console.log(`Thread ${id}: finished`);
}

async function main() {
    console.log("Multithreading with asynchronous tasks");
    const start = Date.now();
    await Promise.all([
        worker("A", 3),
        worker("B", 2),
        worker("C", 4)
    ]);
    console.log(`All threads finished in about ${Date.now() - start} ms`);
    console.log("The event loop interleaved the tasks, demonstrating concurrency.");
}

main();

// Topic: Thread Pool
// Concept: A fixed set of worker threads repeatedly takes tasks from a shared queue.
// This avoids the overhead of creating a new thread for every task.
// Use: Web servers, database engines, and parallel task execution.
// Time: O(tasks) to process all tasks. Space: O(workers + queued tasks).

class ThreadPool {
    constructor(workerCount) {
        this.workers = Array.from({ length: workerCount }, (_, id) => ({
            id,
            busy: false,
            completed: 0
        }));
        this.queue = [];
        this.time = 0;
    }

    submit(task) {
        this.queue.push(task);
        console.log(`Submitted ${task.name} (queue length ${this.queue.length})`);
    }

    run() {
        while (this.queue.length > 0 || this.workers.some((worker) => worker.busy)) {
            for (const worker of this.workers) {
                if (!worker.busy && this.queue.length > 0) {
                    worker.busy = true;
                    worker.task = this.queue.shift();
                    worker.remaining = worker.task.duration;
                    console.log(`t=${this.time}: W${worker.id} starts ${worker.task.name}`);
                }
            }

            for (const worker of this.workers) {
                if (!worker.busy) continue;
                worker.remaining--;
                if (worker.remaining === 0) {
                    console.log(`t=${this.time}: W${worker.id} finishes ${worker.task.name}`);
                    worker.busy = false;
                    worker.completed++;
                    worker.task = null;
                }
            }

            this.time++;
        }
    }
}

const pool = new ThreadPool(3);
console.log("Thread Pool Simulation");
pool.submit({ name: "task-A", duration: 3 });
pool.submit({ name: "task-B", duration: 2 });
pool.submit({ name: "task-C", duration: 4 });
pool.submit({ name: "task-D", duration: 1 });
pool.submit({ name: "task-E", duration: 2 });
pool.run();

console.log("\nWorker statistics:");
console.table(pool.workers.map((worker) => ({
    Worker: `W${worker.id}`,
    Completed: worker.completed
})));
console.log(`Total time: ${pool.time}`);

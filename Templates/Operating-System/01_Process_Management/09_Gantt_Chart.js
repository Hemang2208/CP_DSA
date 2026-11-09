// Topic: Gantt Chart Generation
// Concept: A Gantt chart is a timeline of CPU allocation. Each segment stores a process ID
// and its start/end time, making idle gaps and execution order visible.
// Use: Visualizing and verifying CPU schedules in OS practicals.
// Time: O(n) for n segments. Space: O(n).

const segments = [
    { pid: "P1", start: 0, end: 4 },
    { pid: "P2", start: 4, end: 7 },
    { pid: "IDLE", start: 7, end: 9 },
    { pid: "P3", start: 9, end: 15 },
    { pid: "P4", start: 15, end: 18 }
];

function renderGantt(segments) {
    let top = "|";
    let bottom = "";

    for (const segment of segments) {
        const width = Math.max(3, segment.end - segment.start + 2);
        const label = segment.pid.padEnd(width - 2);
        top += ` ${label} |`;
    }

    const times = [segments[0].start, ...segments.map((s) => s.end)];
    for (const time of times) {
        bottom += String(time).padEnd(7);
    }

    console.log(top);
    console.log(bottom);
}

console.log("Gantt Chart Generation");
renderGantt(segments);
console.log("\nSegment details:");
for (const segment of segments) {
    const duration = segment.end - segment.start;
    console.log(`${segment.pid}: ${segment.start} -> ${segment.end} (${duration} units)`);
}

const busy = segments
    .filter((s) => s.pid !== "IDLE")
    .reduce((sum, s) => sum + (s.end - s.start), 0);
const total = segments[segments.length - 1].end - segments[0].start;
console.log(`\nBusy time: ${busy}, Total time: ${total}, CPU utilization: ${((busy / total) * 100).toFixed(2)}%`);

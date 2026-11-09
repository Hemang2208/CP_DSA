// Topic: Comparison of Page Replacement Algorithms
// Concept: FIFO, LRU, Optimal, LFU, MFU, Second Chance, and Clock make different eviction
// choices. Their fault counts reveal trade-offs between accuracy and implementation cost.
// Use: Selecting a policy for a virtual-memory workload.
// Time: O(references * frames) per algorithm. Space: O(frames).

const references = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
const frameCount = 3;

function fifo(refs, n) {
    const frames = [];
    let faults = 0;
    for (const page of refs) {
        if (frames.includes(page)) continue;
        faults++;
        if (frames.length === n) frames.shift();
        frames.push(page);
    }
    return faults;
}

function lru(refs, n) {
    const frames = [];
    const last = new Map();
    let faults = 0;
    for (let time = 0; time < refs.length; time++) {
        const page = refs[time];
        if (frames.includes(page)) {
            last.set(page, time);
            continue;
        }
        faults++;
        if (frames.length < n) {
            frames.push(page);
        } else {
            let victim = frames[0];
            for (const candidate of frames) {
                if (last.get(candidate) < last.get(victim)) victim = candidate;
            }
            frames[frames.indexOf(victim)] = page;
            last.delete(victim);
        }
        last.set(page, time);
    }
    return faults;
}

function optimal(refs, n) {
    const frames = [];
    let faults = 0;

    function nextUse(page, from) {
        for (let i = from; i < refs.length; i++) if (refs[i] === page) return i;
        return Infinity;
    }

    for (let time = 0; time < refs.length; time++) {
        const page = refs[time];
        if (frames.includes(page)) continue;
        faults++;
        if (frames.length < n) {
            frames.push(page);
        } else {
            let victim = frames[0];
            for (const candidate of frames) {
                if (nextUse(candidate, time + 1) > nextUse(victim, time + 1)) victim = candidate;
            }
            frames[frames.indexOf(victim)] = page;
        }
    }
    return faults;
}

function frequencyBased(refs, n, evictHighest) {
    const frames = [];
    const freq = new Map();
    const last = new Map();
    let faults = 0;

    for (let time = 0; time < refs.length; time++) {
        const page = refs[time];
        if (frames.includes(page)) {
            freq.set(page, freq.get(page) + 1);
            last.set(page, time);
            continue;
        }
        faults++;
        if (frames.length < n) {
            frames.push(page);
        } else {
            let victim = frames[0];
            for (const candidate of frames) {
                const candidateFreq = freq.get(candidate);
                const victimFreq = freq.get(victim);
                const better = evictHighest ? candidateFreq > victimFreq : candidateFreq < victimFreq;
                const tie = candidateFreq === victimFreq && last.get(candidate) < last.get(victim);
                if (better || tie) victim = candidate;
            }
            frames[frames.indexOf(victim)] = page;
            freq.delete(victim);
            last.delete(victim);
        }
        freq.set(page, 1);
        last.set(page, time);
    }
    return faults;
}

function secondChance(refs, n) {
    const queue = [];
    let faults = 0;
    for (const page of refs) {
        const existing = queue.find((e) => e.page === page);
        if (existing) {
            existing.ref = true;
            continue;
        }
        faults++;
        if (queue.length < n) {
            queue.push({ page, ref: true });
            continue;
        }
        while (queue[0].ref) {
            queue[0].ref = false;
            queue.push(queue.shift());
        }
        queue.shift();
        queue.push({ page, ref: true });
    }
    return faults;
}

function clock(refs, n) {
    const frames = [];
    let hand = 0;
    let faults = 0;
    for (const page of refs) {
        const existing = frames.find((e) => e.page === page);
        if (existing) {
            existing.ref = true;
            continue;
        }
        faults++;
        if (frames.length < n) {
            frames.push({ page, ref: true });
            continue;
        }
        while (frames[hand].ref) {
            frames[hand].ref = false;
            hand = (hand + 1) % n;
        }
        frames[hand] = { page, ref: true };
        hand = (hand + 1) % n;
    }
    return faults;
}

const results = [
    { Algorithm: "FIFO", Faults: fifo(references, frameCount) },
    { Algorithm: "LRU", Faults: lru(references, frameCount) },
    { Algorithm: "Optimal", Faults: optimal(references, frameCount) },
    { Algorithm: "LFU", Faults: frequencyBased(references, frameCount, false) },
    { Algorithm: "MFU", Faults: frequencyBased(references, frameCount, true) },
    { Algorithm: "Second Chance", Faults: secondChance(references, frameCount) },
    { Algorithm: "Clock", Faults: clock(references, frameCount) }
];

console.log(`Page Replacement Comparison (${frameCount} frames, ${references.length} references)`);
console.table(results);

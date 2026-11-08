// Topic: GREEDY ALGORITHMS APPLICATIONS
// Pattern: Sort + Local Optimal Choice / Exchange Argument
// Use Cases: Fractional knapsack, job sequencing, platforms, intervals,
// jump game, gas station, candy, Huffman, ropes, partition labels.
//
// Example Problem: Jump Game II and Minimum Cost to Connect Ropes
// Source: Classic greedy problems (LeetCode 45 / 1167).
//
// node "GreedyApplications.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(Number(input[index++]));
    }

    return arr;
}

function activitySelection(intervals) {
    const sorted = intervals.slice().sort((a, b) => a[1] - b[1]);
    const result = [];
    let end = -Infinity;

    for (const interval of sorted) {
        if (interval[0] >= end) {
            result.push(interval);
            end = interval[1];
        }
    }

    return result;
}

function fractionalKnapsack(items, capacity) {
    const sorted = items.slice().sort((a, b) => b.value / b.weight - a.value / a.weight);
    let total = 0;

    for (const item of sorted) {
        if (capacity >= item.weight) {
            total += item.value;
            capacity -= item.weight;
        } else {
            total += item.value * (capacity / item.weight);
            break;
        }
    }

    return total;
}

function jobSequencing(jobs) {
    const sorted = jobs.slice().sort((a, b) => b.profit - a.profit);
    const maxDeadline = Math.max(...jobs.map((job) => job.deadline), 0);
    const slots = new Array(maxDeadline + 1).fill(false);
    let profit = 0;

    for (const job of sorted) {
        for (let slot = job.deadline; slot > 0; slot--) {
            if (!slots[slot]) {
                slots[slot] = true;
                profit += job.profit;
                break;
            }
        }
    }

    return profit;
}

function minimumPlatforms(arrivals, departures) {
    arrivals.sort((a, b) => a - b);
    departures.sort((a, b) => a - b);
    let platforms = 0;
    let best = 0;
    let i = 0;
    let j = 0;

    while (i < arrivals.length) {
        if (arrivals[i] <= departures[j]) {
            platforms++;
            best = Math.max(best, platforms);
            i++;
        } else {
            platforms--;
            j++;
        }
    }

    return best;
}

function nonOverlappingIntervals(intervals) {
    const sorted = intervals.slice().sort((a, b) => a[1] - b[1]);
    let removals = 0;
    let end = -Infinity;

    for (const interval of sorted) {
        if (interval[0] >= end) end = interval[1];
        else removals++;
    }

    return removals;
}

function arrowsToBurstBalloons(points) {
    const sorted = points.slice().sort((a, b) => a[1] - b[1]);
    let arrows = 0;
    let end = -Infinity;

    for (const point of sorted) {
        if (point[0] > end) {
            arrows++;
            end = point[1];
        }
    }

    return arrows;
}

function assignCookies(children, cookies) {
    children.sort((a, b) => a - b);
    cookies.sort((a, b) => a - b);
    let i = 0;

    for (const cookie of cookies) {
        if (i < children.length && cookie >= children[i]) i++;
    }

    return i;
}

function jumpGameII(arr) {
    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        farthest = Math.max(farthest, i + arr[i]);

        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }

    return jumps;
}

function gasStation(gas, cost) {
    let total = 0;
    let tank = 0;
    let start = 0;

    for (let i = 0; i < gas.length; i++) {
        const gain = gas[i] - cost[i];
        total += gain;
        tank += gain;

        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }

    return total >= 0 ? start : -1;
}

function candyDistribution(ratings) {
    const candies = new Array(ratings.length).fill(1);

    for (let i = 1; i < ratings.length; i++) {
        if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
    }

    for (let i = ratings.length - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }

    return candies.reduce((sum, value) => sum + value, 0);
}

function lemonadeChange(bills) {
    let fives = 0;
    let tens = 0;

    for (const bill of bills) {
        if (bill === 5) fives++;
        else if (bill === 10) {
            if (!fives) return false;
            fives--;
            tens++;
        } else {
            if (tens && fives) {
                tens--;
                fives--;
            } else if (fives >= 3) fives -= 3;
            else return false;
        }
    }

    return true;
}

function connectRopes(ropes) {
    const heap = ropes.slice().sort((a, b) => a - b);
    let cost = 0;

    while (heap.length > 1) {
        heap.sort((a, b) => a - b);
        const first = heap.shift();
        const second = heap.shift();
        const combined = first + second;
        cost += combined;
        heap.push(combined);
    }

    return cost;
}

function minimumCoins(amount, coins) {
    const sorted = coins.slice().sort((a, b) => b - a);
    let count = 0;

    for (const coin of sorted) {
        count += Math.floor(amount / coin);
        amount %= coin;
    }

    return amount === 0 ? count : -1;
}

function partitionLabels(s) {
    const last = new Map();

    for (let i = 0; i < s.length; i++) last.set(s[i], i);

    const result = [];
    let start = 0;
    let end = 0;

    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, last.get(s[i]));

        if (i === end) {
            result.push(end - start + 1);
            start = end + 1;
        }
    }

    return result;
}

function taskScheduler(tasks, cooldown) {
    const counts = new Map();

    for (const task of tasks) counts.set(task, (counts.get(task) || 0) + 1);

    const frequencies = [...counts.values()].sort((a, b) => b - a);
    const maxFrequency = frequencies[0] || 0;
    const maxCount = frequencies.filter((value) => value === maxFrequency).length;

    return Math.max(tasks.length, (maxFrequency - 1) * (cooldown + 1) + maxCount);
}

function huffmanCost(frequencies) {
    const heap = frequencies.slice();

    if (heap.length <= 1) return 0;

    let cost = 0;

    while (heap.length > 1) {
        heap.sort((a, b) => a - b);
        const combined = heap.shift() + heap.shift();
        cost += combined;
        heap.push(combined);
    }

    return cost;
}

function solve() {
    const n = Number(input[index++]);
    const arr = inputArray(n);

    return `${jumpGameII(arr)} ${connectRopes(arr)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));

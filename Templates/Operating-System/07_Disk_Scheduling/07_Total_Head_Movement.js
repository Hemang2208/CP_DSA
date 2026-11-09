// Topic: Total Head Movement Calculation
// Concept: Total head movement is the sum of absolute differences between consecutive
// positions in the service order, including the initial head position.
// Use: Comparing disk-scheduling algorithms.
// Time: O(n). Space: O(n).

function totalHeadMovement(initialHead, serviceOrder) {
    const sequence = [initialHead, ...serviceOrder];
    let total = 0;

    console.log(`Sequence: ${sequence.join(" -> ")}`);
    for (let i = 1; i < sequence.length; i++) {
        const movement = Math.abs(sequence[i] - sequence[i - 1]);
        total += movement;
        console.log(`  ${sequence[i - 1]} -> ${sequence[i]} = ${movement}`);
    }

    return total;
}

console.log("Total Head Movement Calculation");
const movement = totalHeadMovement(50, [82, 170, 43, 140, 24, 16, 190]);
console.log(`Total head movement: ${movement}`);
console.log("Lower total movement generally means lower seek time.");

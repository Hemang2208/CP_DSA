// Topic: COMPUTATIONAL GEOMETRY
// Pattern: Convex Hull (Monotone Chain) + Shoelace Area
// Use Cases: Convex hull, polygon area, orientation tests, point
// containment, rotating calipers preprocessing.
//
// Example Problem: Convex Hull Size and Doubled Polygon Area
// Source: Classic convex hull problem.
//
// node "ComputationalGeometry.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function inputPoints(n) {
    let points = [];

    for (let i = 0; i < n; i++) {
        const x = Number(input[index++]);
        const y = Number(input[index++]);
        points.push([x, y]);
    }

    return points;
}

function cross(origin, first, second) {
    return (
        (first[0] - origin[0]) * (second[1] - origin[1]) -
        (first[1] - origin[1]) * (second[0] - origin[0])
    );
}

// Approach: sort points lexicographically and build lower and upper
// chains. Cross <= 0 removes collinear middle points. The shoelace
// formula then gives twice the polygon area.
function convexHull(points) {
    if (points.length <= 1) {
        return points.slice();
    }

    const sorted = points
        .slice()
        .sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    const unique = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
        if (
            sorted[i][0] !== sorted[i - 1][0] ||
            sorted[i][1] !== sorted[i - 1][1]
        ) {
            unique.push(sorted[i]);
        }
    }

    if (unique.length <= 2) {
        return unique;
    }

    const lower = [];

    for (const point of unique) {
        while (
            lower.length >= 2 &&
            cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0
        ) {
            lower.pop();
        }

        lower.push(point);
    }

    const upper = [];

    for (let i = unique.length - 1; i >= 0; i--) {
        const point = unique[i];

        while (
            upper.length >= 2 &&
            cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0
        ) {
            upper.pop();
        }

        upper.push(point);
    }

    lower.pop();
    upper.pop();

    return lower.concat(upper);
}

function doubledArea(hull) {
    let area = 0;

    for (let i = 0; i < hull.length; i++) {
        const next = (i + 1) % hull.length;
        area += hull[i][0] * hull[next][1] - hull[i][1] * hull[next][0];
    }

    return Math.abs(area);
}

function solve() {
    const n = Number(input[index++]);
    const points = inputPoints(n);
    const hull = convexHull(points);

    return hull.length + " " + doubledArea(hull);
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));

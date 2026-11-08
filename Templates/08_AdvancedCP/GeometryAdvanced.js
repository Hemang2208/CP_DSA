// Topic: COMPUTATIONAL GEOMETRY - ADVANCED
// Pattern: Convex Hull / Intersections / Point In Polygon / Closest Pair
// Use Cases: Hull construction, segment crossing, polygon area, rotating
// calipers, circle intersection, half-plane and angle ordering.
//
// Example Problem: Convex Hull And Polygon Area
// Source: Classic monotone-chain convex hull exercise.
//
// node "GeometryAdvanced.js" < "Input.txt" > "Output.txt"

const fs = require("fs");

const input = fs.readFileSync(0, "utf-8").trim().split(/\s+/).map(Number);

let index = 0;
const t = Number(input[index++]);
const outcomes = [];

function cross(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

function distanceSquared(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return dx * dx + dy * dy;
}

function convexHull(points) {
    const unique = [...new Map(points.map((point) => [point.join(","), point])).values()];
    unique.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    if (unique.length <= 1) return unique;

    const lower = [];

    for (const point of unique) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
            lower.pop();
        }
        lower.push(point);
    }

    const upper = [];

    for (let i = unique.length - 1; i >= 0; i--) {
        const point = unique[i];

        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
            upper.pop();
        }
        upper.push(point);
    }

    lower.pop();
    upper.pop();
    return lower.concat(upper);
}

function polygonArea(points) {
    let area = 0;

    for (let i = 0; i < points.length; i++) {
        const next = points[(i + 1) % points.length];
        area += points[i][0] * next[1] - points[i][1] * next[0];
    }

    return Math.abs(area) / 2;
}

function orientation(a, b, c) {
    const value = cross(a, b, c);
    if (Math.abs(value) < 1e-9) return 0;
    return value > 0 ? 1 : -1;
}

function onSegment(a, b, point) {
    return (
        Math.min(a[0], b[0]) <= point[0] &&
        point[0] <= Math.max(a[0], b[0]) &&
        Math.min(a[1], b[1]) <= point[1] &&
        point[1] <= Math.max(a[1], b[1]) &&
        Math.abs(cross(a, b, point)) < 1e-9
    );
}

function segmentsIntersect(a, b, c, d) {
    const o1 = orientation(a, b, c);
    const o2 = orientation(a, b, d);
    const o3 = orientation(c, d, a);
    const o4 = orientation(c, d, b);

    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && onSegment(a, b, c)) return true;
    if (o2 === 0 && onSegment(a, b, d)) return true;
    if (o3 === 0 && onSegment(c, d, a)) return true;
    if (o4 === 0 && onSegment(c, d, b)) return true;
    return false;
}

function pointInPolygon(points, point) {
    let inside = false;

    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const a = points[i];
        const b = points[j];

        if (onSegment(a, b, point)) return "boundary";

        const intersects =
            a[1] > point[1] !== b[1] > point[1] &&
            point[0] < ((b[0] - a[0]) * (point[1] - a[1])) / (b[1] - a[1]) + a[0];

        if (intersects) inside = !inside;
    }

    return inside ? "inside" : "outside";
}

function closestPair(points) {
    const sorted = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    function solve(left, right) {
        if (right - left <= 3) {
            let best = Infinity;

            for (let i = left; i < right; i++) {
                for (let j = i + 1; j < right; j++) {
                    best = Math.min(best, distanceSquared(sorted[i], sorted[j]));
                }
            }

            return best;
        }

        const middle = Math.floor((left + right) / 2);
        const middleX = sorted[middle][0];
        let best = Math.min(solve(left, middle), solve(middle, right));
        const strip = [];

        for (let i = left; i < right; i++) {
            const dx = sorted[i][0] - middleX;
            if (dx * dx < best) strip.push(sorted[i]);
        }

        strip.sort((a, b) => a[1] - b[1]);

        for (let i = 0; i < strip.length; i++) {
            for (let j = i + 1; j < strip.length && (strip[j][1] - strip[i][1]) ** 2 < best; j++) {
                best = Math.min(best, distanceSquared(strip[i], strip[j]));
            }
        }

        return best;
    }

    return Math.sqrt(solve(0, sorted.length));
}

function rotatingCalipersDiameter(points) {
    const hull = convexHull(points);
    const n = hull.length;
    if (n <= 1) return 0;

    let j = 1;
    let diameter = 0;

    for (let i = 0; i < n; i++) {
        while (Math.abs(cross(hull[i], hull[(i + 1) % n], hull[(j + 1) % n])) >
               Math.abs(cross(hull[i], hull[(i + 1) % n], hull[j]))) {
            j = (j + 1) % n;
        }

        diameter = Math.max(diameter, distanceSquared(hull[i], hull[j]));
        diameter = Math.max(diameter, distanceSquared(hull[(i + 1) % n], hull[j]));
    }

    return Math.sqrt(diameter);
}

function circleIntersection(c1, r1, c2, r2) {
    const dx = c2[0] - c1[0];
    const dy = c2[1] - c1[1];
    const d = Math.hypot(dx, dy);

    if (d > r1 + r2 || d < Math.abs(r1 - r2) || d === 0) return [];
    if (Math.abs(d - r1 - r2) < 1e-9) {
        return [[c1[0] + (dx * r1) / d, c1[1] + (dy * r1) / d]];
    }

    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
    const x = c1[0] + (dx * a) / d;
    const y = c1[1] + (dy * a) / d;

    return [
        [x + (dy * h) / d, y - (dx * h) / d],
        [x - (dy * h) / d, y + (dx * h) / d],
    ];
}

function sortByAngle(points, origin = [0, 0]) {
    return points.slice().sort((a, b) => {
        const angleA = Math.atan2(a[1] - origin[1], a[0] - origin[0]);
        const angleB = Math.atan2(b[1] - origin[1], b[0] - origin[0]);
        return angleA - angleB || distanceSquared(origin, a) - distanceSquared(origin, b);
    });
}

function solve() {
    const n = Number(input[index++]);
    const points = [];

    for (let i = 0; i < n; i++) {
        points.push([Number(input[index++]), Number(input[index++])]);
    }

    const hull = convexHull(points);
    return `${hull.length} ${polygonArea(hull)}`;
}

for (let i = 0; i < t; i++) {
    outcomes.push(solve());
}

console.log(outcomes.join("\n"));

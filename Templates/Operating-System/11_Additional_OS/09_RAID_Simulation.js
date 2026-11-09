// Topic: RAID Simulation
// Concept: RAID combines disks for performance or reliability. RAID 0 stripes data,
// RAID 1 mirrors it, and RAID 5 stripes data with distributed parity.
// Use: Storage servers and fault-tolerant file systems.
// Time: O(disks) per read/write. Space: O(disks * capacity).

console.log("RAID Simulation");

const data = ["A", "B", "C", "D", "E", "F"];

console.log("\nRAID 0 (striping, no redundancy)");
const raid0 = [[], []];
data.forEach((block, index) => raid0[index % 2].push(block));
console.log("Disk 0:", raid0[0].join(" "));
console.log("Disk 1:", raid0[1].join(" "));
console.log("Read A -> disk 0 block 0; read B -> disk 1 block 0");

console.log("\nRAID 1 (mirroring)");
const raid1 = [[...data], [...data]];
console.log("Disk 0:", raid1[0].join(" "));
console.log("Disk 1:", raid1[1].join(" "));
console.log("Disk 1 fails; data still available on disk 0");

console.log("\nRAID 5 (striping + distributed parity)");
const raid5 = [[], [], []];
const parity = (blocks) => blocks.join("");
for (let i = 0; i < data.length; i += 2) {
    const chunk = data.slice(i, i + 2);
    const p = parity(chunk);
    const parityDisk = (i / 2) % 3;
    let dataIndex = 0;

    for (let disk = 0; disk < 3; disk++) {
        if (disk === parityDisk) {
            raid5[disk].push(`P(${p})`);
        } else {
            raid5[disk].push(chunk[dataIndex++]);
        }
    }
}

raid5.forEach((disk, index) => console.log(`Disk ${index}: ${disk.join(" ")}`));
console.log("If one disk fails, parity reconstructs its data.");

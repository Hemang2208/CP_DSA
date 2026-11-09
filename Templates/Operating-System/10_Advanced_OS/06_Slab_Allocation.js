// Topic: Slab Allocation
// Concept: A slab allocator keeps caches of fixed-size objects. New slabs are created when
// a cache is empty, and objects are reused after being freed.
// Use: Fast kernel object allocation for task structs, inodes, and network buffers.
// Time: O(1) average per allocate/free. Space: O(objects).

class SlabCache {
    constructor(name, objectSize, objectsPerSlab) {
        this.name = name;
        this.objectSize = objectSize;
        this.objectsPerSlab = objectsPerSlab;
        this.slabs = [];
    }

    createSlab() {
        const slab = {
            id: this.slabs.length,
            objects: Array.from({ length: this.objectsPerSlab }, (_, index) => ({
                index,
                free: true,
                owner: null
            }))
        };
        this.slabs.push(slab);
        console.log(`Created slab ${slab.id} for ${this.name}`);
        return slab;
    }

    allocate(pid) {
        let slab = this.slabs.find((item) => item.objects.some((obj) => obj.free));

        if (!slab) slab = this.createSlab();

        const object = slab.objects.find((obj) => obj.free);
        object.free = false;
        object.owner = pid;
        console.log(`${pid}: allocated ${this.name} object from slab ${slab.id}, index ${object.index}`);
        return { slab: slab.id, index: object.index };
    }

    free(slabId, index) {
        const slab = this.slabs[slabId];
        const object = slab.objects[index];
        object.free = true;
        object.owner = null;
        console.log(`Freed ${this.name} object in slab ${slabId}, index ${index}`);
    }

    display() {
        console.log(`\nCache ${this.name}:`);
        for (const slab of this.slabs) {
            console.log(`Slab ${slab.id}: ${slab.objects.map((o) => (o.free ? "." : o.owner)).join(" ")}`);
        }
    }
}

const cache = new SlabCache("task_struct", 256, 4);
console.log("Slab Allocation");
const a = cache.allocate("P1");
const b = cache.allocate("P2");
const c = cache.allocate("P3");
const d = cache.allocate("P4");
const e = cache.allocate("P5");
cache.display();
cache.free(a.slab, a.index);
cache.free(c.slab, c.index);
cache.display();
cache.allocate("P6");
cache.display();
console.log(`Total slabs: ${cache.slabs.length}, objects per slab: ${cache.objectsPerSlab}`);

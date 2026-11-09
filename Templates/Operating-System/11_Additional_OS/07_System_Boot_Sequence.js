// Topic: System Boot Sequence
// Concept: Firmware initializes hardware, a bootloader loads the kernel, the kernel initializes
// subsystems, and init starts user-space services.
// Use: Understanding startup, recovery, and embedded boot flows.
// Time: O(stages). Space: O(1).

const stages = [
    { name: "Firmware (BIOS/UEFI)", action: "POST hardware, locate boot device" },
    { name: "Bootloader (GRUB/U-Boot)", action: "load kernel and initramfs into memory" },
    { name: "Kernel decompression", action: "decompress and relocate the kernel" },
    { name: "Kernel initialization", action: "set up memory, scheduler, drivers, interrupts" },
    { name: "Mount root filesystem", action: "mount / and start init process" },
    { name: "Init/systemd", action: "start services and getty/login" },
    { name: "User login", action: "authenticate user and start shell" }
];

console.log("System Boot Sequence");
let time = 0;
for (const stage of stages) {
    time += 1;
    console.log(`[${time}] ${stage.name}`);
    console.log(`    ${stage.action}`);
}

console.log("\nBoot complete: system is ready for users.");
console.log("Failures at each stage require different recovery strategies.");

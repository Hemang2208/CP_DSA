# Operating Systems Implementation Handbook (JavaScript / Node.js)

A self-contained, JavaScript-only Operating Systems practical library. Every program uses hardcoded sample data, prints intermediate steps, and finishes with a clear result. No C, C++, Python, stdin, or external files are required.

Location: `Codeforces/Operating-System/`.

## Quick Start

From this folder, run any file directly with Node.js:

```bash
cd Codeforces/Operating-System
node 01_Process_Management/03_FCFS.js
node 06_Page_Replacement/02_LRU.js
node 10_Advanced_OS/06_Slab_Allocation.js
```

Each program is standalone. The output shows the algorithm's decisions, state changes, and final metrics.

## Folder Structure

```text
Operating-System/
├── README.md
├── TOPIC-INDEX.md
├── 01_Process_Management/
│   ├── 01_Process_PCB.js
│   ├── 02_Process_States.js
│   ├── 03_FCFS.js
│   ├── 04_SJF_NonPreemptive.js
│   ├── 05_SRTF_Preemptive.js
│   ├── 06_Priority_Preemptive.js
│   ├── 07_Priority_NonPreemptive.js
│   ├── 08_Round_Robin.js
│   ├── 09_Gantt_Chart.js
│   ├── 10_Time_Metrics.js
│   ├── 11_Average_Metrics.js
│   ├── 12_CPU_Utilization_Throughput.js
│   ├── 13_Context_Switching.js
│   └── 14_Starvation_Aging.js
├── 02_Process_Synchronization/
│   ├── 01_Race_Condition.js
│   ├── 02_Critical_Section.js
│   ├── 03_Mutual_Exclusion.js
│   ├── 04_Mutex_Lock.js
│   ├── 05_Semaphore.js
│   ├── 06_Binary_Semaphore.js
│   ├── 07_Counting_Semaphore.js
│   ├── 08_Producer_Consumer.js
│   ├── 09_Readers_Writers.js
│   ├── 10_Dining_Philosophers.js
│   ├── 11_Sleeping_Barber.js
│   └── 12_Deadlock_Concurrent.js
├── 03_IPC/
│   ├── 01_Shared_Memory.js
│   ├── 02_Message_Passing.js
│   ├── 03_Pipes.js
│   ├── 04_Producer_Consumer_IPC.js
│   ├── 05_Sync_Async_Communication.js
│   └── 06_Client_Server.js
├── 04_Deadlocks/
│   ├── 01_Deadlock_Conditions.js
│   ├── 02_Resource_Allocation_Graph.js
│   ├── 03_Deadlock_Detection.js
│   ├── 04_Deadlock_Prevention.js
│   ├── 05_Deadlock_Avoidance.js
│   ├── 06_Bankers_Algorithm.js
│   ├── 07_Safety_Algorithm.js
│   ├── 08_Resource_Request_Algorithm.js
│   ├── 09_Safe_Unsafe_State.js
│   └── 10_Safe_Sequence.js
├── 05_Memory_Management/
│   ├── 01_Memory_Allocation.js
│   ├── 02_First_Fit.js
│   ├── 03_Best_Fit.js
│   ├── 04_Worst_Fit.js
│   ├── 05_Next_Fit.js
│   ├── 06_Internal_Fragmentation.js
│   ├── 07_External_Fragmentation.js
│   ├── 08_Memory_Compaction.js
│   ├── 09_Paging.js
│   ├── 10_Page_Table.js
│   ├── 11_Address_Translation.js
│   ├── 12_Segmentation.js
│   ├── 13_Paging_vs_Segmentation.js
│   ├── 14_Virtual_Memory.js
│   ├── 15_Demand_Paging.js
│   ├── 16_Page_Fault_Handling.js
│   ├── 17_Thrashing.js
│   └── 18_TLB.js
├── 06_Page_Replacement/
│   ├── 01_FIFO.js
│   ├── 02_LRU.js
│   ├── 03_Optimal.js
│   ├── 04_LFU.js
│   ├── 05_MFU.js
│   ├── 06_Second_Chance.js
│   ├── 07_Clock.js
│   ├── 08_Hit_Fault_Calculation.js
│   ├── 09_Page_Fault_Ratio.js
│   ├── 10_Beledys_Anomaly.js
│   └── 11_Algorithm_Comparison.js
├── 07_Disk_Scheduling/
│   ├── 01_FCFS_Disk.js
│   ├── 02_SSTF.js
│   ├── 03_SCAN.js
│   ├── 04_CSCAN.js
│   ├── 05_LOOK.js
│   ├── 06_CLOOK.js
│   ├── 07_Total_Head_Movement.js
│   └── 08_Disk_Algorithm_Comparison.js
├── 08_File_Management/
│   ├── 01_File_CRUD.js
│   ├── 02_Contiguous_Allocation.js
│   ├── 03_Linked_Allocation.js
│   ├── 04_Indexed_Allocation.js
│   ├── 05_Directory_Structure.js
│   ├── 06_Single_Level_Directory.js
│   ├── 07_Two_Level_Directory.js
│   ├── 08_Tree_Directory.js
│   ├── 09_Disk_Space_Management.js
│   ├── 10_Free_Space_Management.js
│   └── 11_File_Access_Methods.js
├── 09_Threads_Concurrency/
│   ├── 01_Thread_Lifecycle.js
│   ├── 02_User_Level_Threads.js
│   ├── 03_Kernel_Level_Threads.js
│   ├── 04_Multithreading.js
│   ├── 05_Thread_Synchronization.js
│   ├── 06_Thread_Scheduling.js
│   └── 07_Concurrent_Execution.js
├── 10_Advanced_OS/
│   ├── 01_Virtual_Memory_Management.js
│   ├── 02_Demand_Paging_Page_Fault.js
│   ├── 03_Memory_Protection.js
│   ├── 04_Swapping.js
│   ├── 05_Buddy_Allocation.js
│   ├── 06_Slab_Allocation.js
│   ├── 07_Distributed_System_Basics.js
│   ├── 08_Distributed_Mutual_Exclusion.js
│   ├── 09_Load_Balancing.js
│   ├── 10_Real_Time_Scheduling.js
│   ├── 11_Rate_Monotonic_Scheduling.js
│   ├── 12_EDF_Scheduling.js
│   ├── 13_System_Call_Simulation.js
│   ├── 14_Interrupt_Handling.js
│   ├── 15_IO_Management.js
│   └── 16_Spooling.js
└── 11_Additional_OS/
    ├── 01_Monitor.js
    ├── 02_Barrier_Synchronization.js
    ├── 03_Priority_Inversion.js
    ├── 04_Copy_On_Write.js
    ├── 05_Journaling_File_System.js
    ├── 06_Zombie_Orphan_Process.js
    ├── 07_System_Boot_Sequence.js
    ├── 08_Thread_Pool.js
    ├── 09_RAID_Simulation.js
    └── 10_Memory_Mapped_File.js
```

## Design Conventions

- Each file is a complete, runnable Node.js program.
- Sample inputs are hardcoded at the top of the program or inside `main`-style code.
- Output includes intermediate steps such as allocation decisions, queue changes, frame states, and Gantt segments.
- Header comments explain the concept, practical use, and time/space complexity.
- Tables use `console.table` for readable process, frame, and resource state.
- The code uses plain JavaScript classes, arrays, maps, and functions only.

## Coverage Summary

| Folder                       | Focus                                                                         | Programs |
| ---------------------------- | ----------------------------------------------------------------------------- | -------- |
| `01_Process_Management`      | PCB, states, CPU scheduling, metrics, context switching, aging                | 14       |
| `02_Process_Synchronization` | Race conditions, critical sections, mutex, semaphores, classic problems       | 12       |
| `03_IPC`                     | Shared memory, messages, pipes, sync/async IPC, client-server                 | 6        |
| `04_Deadlocks`               | Conditions, RAG, detection, prevention, avoidance, Banker's algorithm         | 10       |
| `05_Memory_Management`       | Allocation, fragmentation, paging, segmentation, virtual memory, TLB          | 18       |
| `06_Page_Replacement`        | FIFO, LRU, OPT, LFU, MFU, second chance, clock, Belady's anomaly              | 11       |
| `07_Disk_Scheduling`         | FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK, movement comparison                   | 8        |
| `08_File_Management`         | File CRUD, allocation methods, directories, free space, access methods        | 11       |
| `09_Threads_Concurrency`     | Thread lifecycle, ULT/KLT, multithreading, synchronization, scheduling        | 7        |
| `10_Advanced_OS`             | Virtual memory, protection, swapping, buddy/slab, distributed, real-time, I/O | 16       |
| `11_Additional_OS`           | Monitor, barrier, priority inversion, COW, journaling, boot, RAID, mmap       | 10       |

Total: **123 standalone JavaScript programs**.

## Validation

Every program was syntax-checked with `node --check` and executed with Node.js to confirm it runs without errors. Programs use deterministic hardcoded inputs, except the multithreading demonstration which intentionally shows asynchronous interleaving through the Node.js event loop.

## Notes

- The folder is intentionally self-contained and repeats concepts that may exist elsewhere in the repository.
- The examples are designed for college OS practicals, viva preparation, and revision.
- For competitive-programming-style input/output, see the other folders in this repository; this folder is for learning OS behavior.

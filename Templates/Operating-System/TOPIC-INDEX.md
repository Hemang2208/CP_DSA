# Topic Index

Every requested Operating Systems topic is mapped to a standalone JavaScript file. Paths are relative to the `Operating-System/` folder inside the repository's existing `Codeforces` directory.

## 1. Process Management and CPU Scheduling

| Topic                                                         | File                                                     |
| ------------------------------------------------------------- | -------------------------------------------------------- |
| Process and Process Control Block (PCB) simulation            | `01_Process_Management/01_Process_PCB.js`                |
| Process states and state transition                           | `01_Process_Management/02_Process_States.js`             |
| FCFS (First Come First Served)                                | `01_Process_Management/03_FCFS.js`                       |
| SJF (Shortest Job First - Non-Preemptive)                     | `01_Process_Management/04_SJF_NonPreemptive.js`          |
| SRTF (Shortest Remaining Time First - Preemptive)             | `01_Process_Management/05_SRTF_Preemptive.js`            |
| Priority scheduling - Preemptive                              | `01_Process_Management/06_Priority_Preemptive.js`        |
| Priority scheduling - Non-Preemptive                          | `01_Process_Management/07_Priority_NonPreemptive.js`     |
| Round Robin scheduling                                        | `01_Process_Management/08_Round_Robin.js`                |
| Gantt chart generation                                        | `01_Process_Management/09_Gantt_Chart.js`                |
| Completion time, turnaround time, waiting time, response time | `01_Process_Management/10_Time_Metrics.js`               |
| Average waiting time and average turnaround time              | `01_Process_Management/11_Average_Metrics.js`            |
| CPU utilization and throughput                                | `01_Process_Management/12_CPU_Utilization_Throughput.js` |
| Context switching simulation                                  | `01_Process_Management/13_Context_Switching.js`          |
| Starvation and aging                                          | `01_Process_Management/14_Starvation_Aging.js`           |

## 2. Process Synchronization

| Topic                            | File                                                   |
| -------------------------------- | ------------------------------------------------------ |
| Race condition simulation        | `02_Process_Synchronization/01_Race_Condition.js`      |
| Critical section problem         | `02_Process_Synchronization/02_Critical_Section.js`    |
| Mutual exclusion                 | `02_Process_Synchronization/03_Mutual_Exclusion.js`    |
| Mutex lock simulation            | `02_Process_Synchronization/04_Mutex_Lock.js`          |
| Semaphore implementation         | `02_Process_Synchronization/05_Semaphore.js`           |
| Binary semaphore                 | `02_Process_Synchronization/06_Binary_Semaphore.js`    |
| Counting semaphore               | `02_Process_Synchronization/07_Counting_Semaphore.js`  |
| Producer-Consumer problem        | `02_Process_Synchronization/08_Producer_Consumer.js`   |
| Readers-Writers problem          | `02_Process_Synchronization/09_Readers_Writers.js`     |
| Dining Philosophers problem      | `02_Process_Synchronization/10_Dining_Philosophers.js` |
| Sleeping Barber problem          | `02_Process_Synchronization/11_Sleeping_Barber.js`     |
| Deadlock in concurrent processes | `02_Process_Synchronization/12_Deadlock_Concurrent.js` |

## 3. Inter-Process Communication (IPC)

| Topic                                      | File                                    |
| ------------------------------------------ | --------------------------------------- |
| Shared memory simulation                   | `03_IPC/01_Shared_Memory.js`            |
| Message passing                            | `03_IPC/02_Message_Passing.js`          |
| Pipes simulation                           | `03_IPC/03_Pipes.js`                    |
| Producer-Consumer communication            | `03_IPC/04_Producer_Consumer_IPC.js`    |
| Synchronous and asynchronous communication | `03_IPC/05_Sync_Async_Communication.js` |
| Client-server communication simulation     | `03_IPC/06_Client_Server.js`            |

## 4. Deadlocks

| Topic                                    | File                                            |
| ---------------------------------------- | ----------------------------------------------- |
| Deadlock conditions (Coffman conditions) | `04_Deadlocks/01_Deadlock_Conditions.js`        |
| Resource allocation graph                | `04_Deadlocks/02_Resource_Allocation_Graph.js`  |
| Deadlock detection                       | `04_Deadlocks/03_Deadlock_Detection.js`         |
| Deadlock prevention                      | `04_Deadlocks/04_Deadlock_Prevention.js`        |
| Deadlock avoidance                       | `04_Deadlocks/05_Deadlock_Avoidance.js`         |
| Banker's algorithm                       | `04_Deadlocks/06_Bankers_Algorithm.js`          |
| Safety algorithm                         | `04_Deadlocks/07_Safety_Algorithm.js`           |
| Resource request algorithm               | `04_Deadlocks/08_Resource_Request_Algorithm.js` |
| Safe and unsafe state detection          | `04_Deadlocks/09_Safe_Unsafe_State.js`          |
| Safe sequence generation                 | `04_Deadlocks/10_Safe_Sequence.js`              |

## 5. Memory Management

| Topic                                         | File                                                |
| --------------------------------------------- | --------------------------------------------------- |
| Memory allocation                             | `05_Memory_Management/01_Memory_Allocation.js`      |
| First Fit                                     | `05_Memory_Management/02_First_Fit.js`              |
| Best Fit                                      | `05_Memory_Management/03_Best_Fit.js`               |
| Worst Fit                                     | `05_Memory_Management/04_Worst_Fit.js`              |
| Next Fit                                      | `05_Memory_Management/05_Next_Fit.js`               |
| Internal fragmentation                        | `05_Memory_Management/06_Internal_Fragmentation.js` |
| External fragmentation                        | `05_Memory_Management/07_External_Fragmentation.js` |
| Memory compaction                             | `05_Memory_Management/08_Memory_Compaction.js`      |
| Paging technique                              | `05_Memory_Management/09_Paging.js`                 |
| Page table implementation                     | `05_Memory_Management/10_Page_Table.js`             |
| Logical to physical address translation       | `05_Memory_Management/11_Address_Translation.js`    |
| Segmentation                                  | `05_Memory_Management/12_Segmentation.js`           |
| Paging vs segmentation                        | `05_Memory_Management/13_Paging_vs_Segmentation.js` |
| Virtual memory                                | `05_Memory_Management/14_Virtual_Memory.js`         |
| Demand paging                                 | `05_Memory_Management/15_Demand_Paging.js`          |
| Page fault handling                           | `05_Memory_Management/16_Page_Fault_Handling.js`    |
| Thrashing simulation                          | `05_Memory_Management/17_Thrashing.js`              |
| Translation Lookaside Buffer (TLB) simulation | `05_Memory_Management/18_TLB.js`                    |

## 6. Page Replacement Algorithms

| Topic                                     | File                                              |
| ----------------------------------------- | ------------------------------------------------- |
| FIFO page replacement                     | `06_Page_Replacement/01_FIFO.js`                  |
| LRU page replacement                      | `06_Page_Replacement/02_LRU.js`                   |
| Optimal page replacement                  | `06_Page_Replacement/03_Optimal.js`               |
| LFU page replacement                      | `06_Page_Replacement/04_LFU.js`                   |
| MFU page replacement                      | `06_Page_Replacement/05_MFU.js`                   |
| Second Chance page replacement            | `06_Page_Replacement/06_Second_Chance.js`         |
| Clock page replacement                    | `06_Page_Replacement/07_Clock.js`                 |
| Page hit and page fault calculation       | `06_Page_Replacement/08_Hit_Fault_Calculation.js` |
| Page fault ratio                          | `06_Page_Replacement/09_Page_Fault_Ratio.js`      |
| Belady's anomaly demonstration            | `06_Page_Replacement/10_Beledys_Anomaly.js`       |
| Comparison of page replacement algorithms | `06_Page_Replacement/11_Algorithm_Comparison.js`  |

## 7. Disk Scheduling Algorithms

| Topic                                | File                                                 |
| ------------------------------------ | ---------------------------------------------------- |
| FCFS disk scheduling                 | `07_Disk_Scheduling/01_FCFS_Disk.js`                 |
| SSTF (Shortest Seek Time First)      | `07_Disk_Scheduling/02_SSTF.js`                      |
| SCAN                                 | `07_Disk_Scheduling/03_SCAN.js`                      |
| C-SCAN                               | `07_Disk_Scheduling/04_CSCAN.js`                     |
| LOOK                                 | `07_Disk_Scheduling/05_LOOK.js`                      |
| C-LOOK                               | `07_Disk_Scheduling/06_CLOOK.js`                     |
| Total head movement calculation      | `07_Disk_Scheduling/07_Total_Head_Movement.js`       |
| Disk scheduling algorithm comparison | `07_Disk_Scheduling/08_Disk_Algorithm_Comparison.js` |

## 8. File Management and File Systems

| Topic                                                   | File                                              |
| ------------------------------------------------------- | ------------------------------------------------- |
| File creation, reading, writing and deletion simulation | `08_File_Management/01_File_CRUD.js`              |
| File allocation - Contiguous                            | `08_File_Management/02_Contiguous_Allocation.js`  |
| File allocation - Linked                                | `08_File_Management/03_Linked_Allocation.js`      |
| File allocation - Indexed                               | `08_File_Management/04_Indexed_Allocation.js`     |
| Directory structure simulation                          | `08_File_Management/05_Directory_Structure.js`    |
| Single-level directory                                  | `08_File_Management/06_Single_Level_Directory.js` |
| Two-level directory                                     | `08_File_Management/07_Two_Level_Directory.js`    |
| Tree-structured directory                               | `08_File_Management/08_Tree_Directory.js`         |
| Disk space management                                   | `08_File_Management/09_Disk_Space_Management.js`  |
| Free space management                                   | `08_File_Management/10_Free_Space_Management.js`  |
| File access methods - Sequential, Direct and Indexed    | `08_File_Management/11_File_Access_Methods.js`    |

## 9. Threads and Concurrency

| Topic                           | File                                                  |
| ------------------------------- | ----------------------------------------------------- |
| Thread lifecycle simulation     | `09_Threads_Concurrency/01_Thread_Lifecycle.js`       |
| User-level threads              | `09_Threads_Concurrency/02_User_Level_Threads.js`     |
| Kernel-level threads            | `09_Threads_Concurrency/03_Kernel_Level_Threads.js`   |
| Multithreading simulation       | `09_Threads_Concurrency/04_Multithreading.js`         |
| Thread synchronization          | `09_Threads_Concurrency/05_Thread_Synchronization.js` |
| Thread scheduling               | `09_Threads_Concurrency/06_Thread_Scheduling.js`      |
| Concurrent execution simulation | `09_Threads_Concurrency/07_Concurrent_Execution.js`   |

## 10. Advanced Operating System Concepts

| Topic                                   | File                                                |
| --------------------------------------- | --------------------------------------------------- |
| Virtual memory management               | `10_Advanced_OS/01_Virtual_Memory_Management.js`    |
| Demand paging and page fault handling   | `10_Advanced_OS/02_Demand_Paging_Page_Fault.js`     |
| Memory protection                       | `10_Advanced_OS/03_Memory_Protection.js`            |
| Swapping                                | `10_Advanced_OS/04_Swapping.js`                     |
| Buddy memory allocation                 | `10_Advanced_OS/05_Buddy_Allocation.js`             |
| Slab allocation                         | `10_Advanced_OS/06_Slab_Allocation.js`              |
| Distributed system basics               | `10_Advanced_OS/07_Distributed_System_Basics.js`    |
| Distributed mutual exclusion simulation | `10_Advanced_OS/08_Distributed_Mutual_Exclusion.js` |
| Load balancing simulation               | `10_Advanced_OS/09_Load_Balancing.js`               |
| Real-time scheduling                    | `10_Advanced_OS/10_Real_Time_Scheduling.js`         |
| Rate Monotonic Scheduling (RMS)         | `10_Advanced_OS/11_Rate_Monotonic_Scheduling.js`    |
| Earliest Deadline First (EDF)           | `10_Advanced_OS/12_EDF_Scheduling.js`               |
| System call simulation                  | `10_Advanced_OS/13_System_Call_Simulation.js`       |
| Interrupt handling simulation           | `10_Advanced_OS/14_Interrupt_Handling.js`           |
| I/O management                          | `10_Advanced_OS/15_IO_Management.js`                |
| Spooling simulation                     | `10_Advanced_OS/16_Spooling.js`                     |

## 11. Additional Important OS Topics

| Topic                                       | File                                             |
| ------------------------------------------- | ------------------------------------------------ |
| Monitor and condition variables             | `11_Additional_OS/01_Monitor.js`                 |
| Barrier synchronization                     | `11_Additional_OS/02_Barrier_Synchronization.js` |
| Priority inversion and priority inheritance | `11_Additional_OS/03_Priority_Inversion.js`      |
| Copy-on-write (COW)                         | `11_Additional_OS/04_Copy_On_Write.js`           |
| Journaling file system                      | `11_Additional_OS/05_Journaling_File_System.js`  |
| Zombie and orphan processes                 | `11_Additional_OS/06_Zombie_Orphan_Process.js`   |
| System boot sequence                        | `11_Additional_OS/07_System_Boot_Sequence.js`    |
| Thread pool                                 | `11_Additional_OS/08_Thread_Pool.js`             |
| RAID simulation (RAID 0, 1, 5)              | `11_Additional_OS/09_RAID_Simulation.js`         |
| Memory-mapped file                          | `11_Additional_OS/10_Memory_Mapped_File.js`      |

## Coverage Check

All 10 requested sections are present, and the additional section adds 10 related OS topics. Total programs: **123**.

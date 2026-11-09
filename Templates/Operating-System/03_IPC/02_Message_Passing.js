// Topic: Message Passing
// Concept: Processes communicate by sending messages to a mailbox. The receiver removes
// messages in FIFO order without sharing memory.
// Use: Microkernels, distributed systems, and actor-style concurrency.
// Time: O(1) per send/receive. Space: O(number of queued messages).

class Mailbox {
    constructor(name) {
        this.name = name;
        this.messages = [];
    }

    send(sender, receiver, text) {
        const message = { from: sender, to: receiver, text };
        this.messages.push(message);
        console.log(`${sender} -> ${receiver}: "${text}" (queued: ${this.messages.length})`);
    }

    receive(pid) {
        const index = this.messages.findIndex((message) => message.to === pid);
        if (index === -1) {
            console.log(`${pid}: no message available`);
            return null;
        }
        const message = this.messages.splice(index, 1)[0];
        console.log(`${pid} received from ${message.from}: "${message.text}"`);
        return message;
    }
}

const mailbox = new Mailbox("kernel-mailbox");
console.log("Message Passing Simulation");
mailbox.send("P1", "P2", "start job");
mailbox.send("P3", "P2", "send data");
mailbox.send("P2", "P3", "acknowledged");

mailbox.receive("P2");
mailbox.receive("P2");
mailbox.receive("P2");
mailbox.receive("P3");

console.log(`Remaining messages: ${mailbox.messages.length}`);

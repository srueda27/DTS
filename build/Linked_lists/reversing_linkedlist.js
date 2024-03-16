"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reverseList(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        let nextNode = curr.next; // first, make sure we don't lose the next node
        curr.next = prev; // reverse the direction of the pointer
        prev = curr; // set the current node to prev for the next node
        curr = nextNode; // move on
    }
    return prev;
}
function swapPairs(head) {
    // Check edge case: linked list has 0 or 1 nodes, just return
    if (!head || !head.next) {
        return head;
    }
    let dummy = head.next; // Step 5
    let prev = null; // Initialize for step 3
    while (head && head.next) {
        if (prev) {
            prev.next = head.next; // Step 4
        }
        prev = head; // Step 3
        let nextNode = head.next.next; // Step 2
        head.next.next = head; // Step 1
        head.next = nextNode; // Step 6
        head = nextNode; // Move to next pair (Step 3)
    }
    return dummy;
}
;

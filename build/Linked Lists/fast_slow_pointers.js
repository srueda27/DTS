"use strict";
// // head is the head node of a linked list
// function fn(head):
//     slow = head
//     fast = head
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNode = void 0;
//     while fast and fast.next:
//         Do something here
//         slow = slow.next
//         fast = fast.next.next // Se mueve el doble de rápido (dos veces)
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
exports.ListNode = ListNode;
// Encontrar el medio es mover al fast el doble del slow
function middleNode(head) {
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
;
function hasCycle(head) {
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}
;
// Encontrar el medio es mover al fast el doble del slow
// En este caso lo iniciamos uno adelante para que slow termine uno antes
function deleteMiddle(head) {
    let slow = head;
    let fast = head.next.next;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let next = slow.next.next;
    slow.next = next;
    return head;
}
;

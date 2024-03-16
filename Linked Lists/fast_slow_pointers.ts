// // head is the head node of a linked list
// function fn(head):
//     slow = head
//     fast = head

//     while fast and fast.next:
//         Do something here
//         slow = slow.next
//         fast = fast.next.next // Se mueve el doble de rápido (dos veces)

export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// Encontrar el medio es mover al fast el doble del slow
function middleNode(head: ListNode | null): ListNode | null {
  let slow = head
  let fast = head

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }

  return slow
};


function hasCycle(head: ListNode | null): boolean {
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
};


// Encontrar el medio es mover al fast el doble del slow
// En este caso lo iniciamos uno adelante para que slow termine uno antes
function deleteMiddle(head: ListNode | null): ListNode | null {
  let slow = head
  let fast = head.next.next

  while (fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
  }
  
  let next = slow.next.next
  slow.next = next

  return head
};
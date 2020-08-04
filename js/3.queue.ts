
class Queue {
    private items: number[] = [];
    enqueue(element: number) {
        this.items.push(element);
    }
    dequeue(){
        return this.items.shift();
    }
    print(){
        console.log('----', this.items.toString());
    }
}

let queue =  new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.print();
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
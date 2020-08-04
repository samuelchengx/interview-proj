class Stack {
    constructor() {
        this.arr =  [];
    }
    push(val){
        this.arr.push(val)
    }
    pop(){
       return this.arr.pop();
    }
    print(){
        console.log('---stack data---', this.arr.join(','));
    }
}

let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.pop();

stack.print();

function one() {
    function two() {
        function three() {
            console.log('three');
        }
        three();
    }
    two();
}
debugger;
one();
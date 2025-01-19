// PriorityQueue.ts
export class PriorityQueue<T> {
    private heap: { value: T; priority: number }[] = [];

    private parent(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private leftChild(index: number): number {
        return 2 * index + 1;
    }

    private rightChild(index: number): number {
        return 2 * index + 2;
    }

    private swap(index1: number, index2: number): void {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    private bubbleUp(index: number): void {
        while (index > 0 && this.heap[index].priority < this.heap[this.parent(index)].priority) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    private bubbleDown(index: number): void {
        let smallest = index;
        const left = this.leftChild(index);
        const right = this.rightChild(index);

        if (left < this.heap.length && this.heap[left].priority < this.heap[smallest].priority) {
            smallest = left;
        }

        if (right < this.heap.length && this.heap[right].priority < this.heap[smallest].priority) {
            smallest = right;
        }

        if (smallest !== index) {
            this.swap(index, smallest);
            this.bubbleDown(smallest);
        }
    }

    enqueue(value: T, priority: number): void {
        this.heap.push({ value, priority });
        this.bubbleUp(this.heap.length - 1);
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const root = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0 && last) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }

        return root.value;
    }

    peek(): T | undefined {
        return this.heap.length > 0 ? this.heap[0].value : undefined;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }
}

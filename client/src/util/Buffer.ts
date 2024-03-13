class Buffer {
    private _visited: number[];
    private _path: number[];

    constructor(visited: number[], path: number[]) {
        this._visited = visited;
        this._path = path;
    }

    update(numVisited: number): void {
        this._visited = this._visited.slice(numVisited, this._visited.length);
    }

    consumeVisited(): number | undefined {
        const head = this._visited.shift();
        return head !== undefined ? head : undefined;
    }

    consumePath(): number | undefined {
        const head = this._path.shift();
        return head !== undefined ? head : undefined;
    }

    visitedIsEmpty(): boolean {
        return this._visited.length === 0;
    }

    pathIsEmpty(): boolean {
        return this._path.length === 0;
    }

    isEmpty(): boolean {
        return this.visitedIsEmpty() && this.pathIsEmpty();
    }
}

export default Buffer;

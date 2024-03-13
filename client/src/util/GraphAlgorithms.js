import {gridIdx, idxToNode} from './GridDraw'
import PriorityQueue from './PriorityQueue'
import Buffer from './Buffer'
import SortBuffer from './SortBuffer'
export const bfs = (sourceNode, targetNode, gridSize, wallNodes) => {
    const visitedNodes = new Set()
    const visitedBuffer = []
    const queue = []
    const parents = []
    queue.push(sourceNode)
    visitedNodes.add(gridIdx(sourceNode, gridSize.numCols))
    while (queue.length !== 0 && !visitedNodes.has(gridIdx(targetNode, gridSize.numCols))) {
        const node = queue[0]
        queue.shift()
        let neighbors = getNeighbors(node, gridSize)
        for (const neighbor of neighbors) {
            const neighborIdx = gridIdx(neighbor, gridSize.numCols)
            if (!visitedNodes.has(neighborIdx) && !wallNodes.has(neighborIdx)) {
                parents[neighborIdx] = gridIdx(node, gridSize.numCols)
                visitedNodes.add(neighborIdx)
                visitedBuffer.push(neighborIdx)
                queue.push(neighbor)
            }
        }
    }
    const pathBuffer = getPath(parents, targetNode, gridSize)
    return new Buffer(visitedBuffer, pathBuffer)
}

export const dfs = (sourceNode, targetNode, gridSize, wallNodes) => {
    const visitedNodes = new Set()
    const stack = []
    const parents = []
    const visitedBuffer = []
    stack.push(sourceNode)
    visitedNodes.add(gridIdx(sourceNode, gridSize.numCols))
    while(stack.length !== 0 && !visitedNodes.has(gridIdx(targetNode, gridSize.numCols))) {
        const node = stack.pop()
        const currIdx = gridIdx(node, gridSize.numCols)
        if (!visitedNodes.has(currIdx)) {
            visitedNodes.add(currIdx)
            visitedBuffer.push(currIdx)
        }
        const neighbors = getNeighbors(node, gridSize)
        for (const neighbor of neighbors) {
            const neighborIdx = gridIdx(neighbor, gridSize.numCols)
            if (!visitedNodes.has(neighborIdx) && !wallNodes.has(neighborIdx)) {
                parents[neighborIdx] = currIdx
                stack.push(neighbor)
            }
        }
    }
    const pathBuffer = getPath(parents, targetNode, gridSize)
    return new Buffer(visitedBuffer, pathBuffer)
}

export const dijkstra = (sourceNode, targetNode, gridSize, wallNodes, weakWallNodes) => {
    const dist = []
    const parents = []
    const visitedBuffer = []
    const pq = new PriorityQueue(dist)
    const visitedNodes = new Set()
    const numCells = gridSize.numRows * gridSize.numCols
    for (let i = 0; i < numCells; i++) {
        if (i === gridIdx(sourceNode, gridSize.numCols)) {
            dist[i] = 0
            pq.enqueue(gridIdx(sourceNode, gridSize.numCols))
        } 
        else {
            dist[i] = Number.MAX_VALUE
        }
    }   
    while (visitedNodes.size < numCells && !visitedNodes.has(gridIdx(targetNode, gridSize.numCols)) && !pq.isEmpty()) {
        const u = pq.dequeue()
        visitedNodes.add(u)
        visitedBuffer.push(u)
        let neighbors = getNeighbors(idxToNode(u, gridSize.numCols), gridSize)
        for (const neighbor of neighbors) {
            const neighborIdx = gridIdx(neighbor, gridSize.numCols) 
            const edgeWeight = getWeightBetweenNodes(neighborIdx, wallNodes, weakWallNodes)
            if (!visitedNodes.has(neighborIdx) && edgeWeight !== Number.MAX_VALUE && dist[u] + edgeWeight < dist[neighborIdx]) {
                parents[neighborIdx] = u
                dist[neighborIdx] = dist[u] + edgeWeight
                pq.enqueue(neighborIdx)
            }
        }
    }
    const pathBuffer = getPath(parents, targetNode, gridSize)
    return new Buffer(visitedBuffer, pathBuffer) 
}

export const astar = (sourceNode, targetNode, gridSize, wallNodes, weakWallNodes) => {
    const dist = []
    const cost = []
    const parents = []
    const visitedBuffer = []
    const closed = new Set()
    const open = new Set()
    const pq = new PriorityQueue(cost)
    const visitedNodes = new Set()
    const numCells = gridSize.numCols * gridSize.numRows

    const sourceIdx = gridIdx(sourceNode, gridSize.numCols)
    const targetIdx = gridIdx(targetNode, gridSize.numCols)

    for (let i = 0; i < numCells; i++) {
        if (i === sourceIdx) {
            dist[sourceIdx] = 0
            cost[sourceIdx] = dist[sourceIdx] + heuristic(sourceNode, targetNode)
            pq.enqueue(i)
        } else {
            dist[i] = Number.MAX_VALUE
            cost[i] = Number.MAX_VALUE
        }
    }
    pq.enqueue(sourceIdx)
    open.add(sourceIdx)

    while (!pq.isEmpty()) {
        const currNodeIdx = pq.dequeue()
        open.delete(currNodeIdx)
        closed.add(currNodeIdx)
        visitedNodes.add(currNodeIdx)
        visitedBuffer.push(currNodeIdx)

        if (currNodeIdx === targetIdx) break
        const neighbors = getNeighbors(idxToNode(currNodeIdx, gridSize.numCols), gridSize)
        for (const neighbor of neighbors) {
            const neighborIdx = gridIdx(neighbor, gridSize.numCols)
            // ignore node if it is in closed list or if it is a unpassable wall node
            if (closed.has(neighborIdx) || wallNodes.has(neighborIdx)) continue
            parents[neighborIdx] = currNodeIdx 
            const edgeWeight = getWeightBetweenNodes(neighborIdx, wallNodes, weakWallNodes)
            const totalWeight = dist[currNodeIdx] + edgeWeight
            dist[neighborIdx] = totalWeight
            cost[neighborIdx] = totalWeight + heuristic(neighbor, targetNode)
            if (open.has(neighborIdx) && (totalWeight > dist[currNodeIdx])) continue
            pq.enqueue(neighborIdx)
            open.add(neighborIdx)
        }

    }
    const pathBuffer = getPath(parents, targetNode, gridSize)
    return new Buffer(visitedBuffer, pathBuffer)
}

const heuristic = (from, to) => {
    // manhattan distance
    return Math.abs(from.x - to.x) + Math.abs(from.y - to.y)
}

const getWeightBetweenNodes = (neighborIdx, wallNodes, weakWallNodes) => {
    if (wallNodes.has(neighborIdx)) {
        return Number.MAX_VALUE
    } else if (weakWallNodes.has(neighborIdx)) {
        return 50
    } else {
        return 1
    }
}

const getNeighbors = (node, gridSize) => {
    let neighbors = []
    const topNode = {x:(node.x-1), y:(node.y)}
    if (topNode.x > 0) neighbors.push(topNode)
    const rightNode = {x:(node.x), y:(node.y+1)}
    if (rightNode.y <= gridSize.numCols) neighbors.push(rightNode)
    const btmNode = {x:(node.x+1), y:(node.y)}
    if (btmNode.x <= gridSize.numRows) neighbors.push(btmNode)
    const leftNode = {x:(node.x), y:(node.y-1)}
    if (leftNode.y > 0) neighbors.push(leftNode)
    return neighbors
}

const getPath = (parents, targetNode, gridSize) => {
    let parent = parents[gridIdx(targetNode, gridSize.numCols)]
    let res = []
    while (parent !== undefined) {
        res.push(parent)
        parent = parents[parent]
    }
    return res
}


export const selectionSort = (arr) => {
    let sorted = []
    let diagram = []
    let scan = []
    let unsorted = arr.slice(0, arr.length)
    for (let i = 0; i < arr.length; i++) {
        let min = unsorted[i]
        let minIdx = i
        for (let j = i; j < arr.length; j++) {
            scan.push(j)
            if (unsorted[j] < min) {
                min = unsorted[j]
                minIdx = j
            }
        }
        scan.push(null)
        sorted.push(i)
        unsorted = unsorted.slice(0, arr.length)
        swap(unsorted, i, minIdx)
        diagram.push(unsorted)
    }
    return new SortBuffer(diagram,sorted,scan)
}

export const bubbleSort = (arr) => {
    let sorted = []
    let diagram = []
    let scan = []
    let unsorted = arr.slice(0, arr.length)
    for (let i = 0; i < arr.length-1; i++) {
        diagram.push(unsorted.slice(0, arr.length))
        for (let j = 0; j < arr.length-1-i; j++) {
            scan.push(j)
            if (unsorted[j] > unsorted[j+1]) {
                swap(unsorted, j, j+1)
            }
            diagram.push(unsorted)
            unsorted = unsorted.slice(0, arr.length)
        }
        scan.push(null)
        sorted.push(arr.length-1-i)
    }
    sorted.push(0)
    return new SortBuffer(diagram,sorted,scan)
}

export const mergeSort = (arr) => {
    const res = arr.slice(0, arr.length)
    const diagram = []
    const scan = []
    const sorted = []
    mergeSortHelper(diagram, scan, res, 0, arr.length-1)
    for (let i = 0; i < arr.length; i++) sorted.push(i)
    return new SortBuffer(diagram, sorted, scan)
}

const mergeSortHelper = (diagram, scan, arr, left, right) => {
    if (left >= right) return;
    const mid = Math.floor((left+right)/2)
    mergeSortHelper(diagram, scan, arr, left, mid)
    mergeSortHelper(diagram, scan, arr, mid+1, right)
    merge(diagram, scan, arr, left, right, mid)
}

const merge = (diagram, scan, arr, left, right, mid) => {
    const n1 = mid - left + 1
    const n2 = right - mid

    const tempLeft = []
    const tempRight = []

    for (let i = 0; i < n1; i++) {
        tempLeft[i] = arr[left+i]
    }
    for (let i = 0; i < n2; i++) {
        tempRight[i] = arr[mid+1+i]
    }

    let i = 0
    let j = 0
    let k = left

    while (i < tempLeft.length && j < tempRight.length) {
        scan.push(k)
        if (tempLeft[i] < tempRight[j]) {
            arr[k++] = tempLeft[i++]
        } else {
            arr[k++] = tempRight[j++]
        }
    }

    while (i < tempLeft.length) {
        scan.push(k)
        arr[k++] = tempLeft[i++]
    }
    while (j < tempRight.length) {
        scan.push(k)
        arr[k++] = tempRight[j++]
    }
    diagram.push(arr.slice(0, arr.length))
    scan.push(null)
}

export const quickSort = (arr) => {
    const res = arr.slice(0, arr.length)
    const diagram = []
    const sorted = []
    const scan = []
    const pivots = []
    quickSortHelper(pivots, diagram, scan, res, 0, res.length-1)
    for (let i = 0; i < arr.length; i++) sorted.push(i)
    return new SortBuffer(diagram, sorted, scan, pivots)
}

const quickSortHelper = (pivots, diagram, scan, arr, left, right) => {
    if (left >= right) return
    let pivotIdx = partition(pivots, diagram, scan, arr, left, right)
    quickSortHelper(pivots, diagram, scan, arr, left, pivotIdx-1)
    quickSortHelper(pivots, diagram, scan, arr, pivotIdx+1, right)
}

const partition = (pivots, diagram, scan, arr, left, right) => {
    const pivot = arr[right]
    let i = left - 1
    for (let j = left; j < right; j++) {
        scan.push(j)
        if (arr[j] < pivot) {
            swap(arr, ++i, j)
        }
    }
    swap(arr, i+1, right)
    diagram.push(arr.slice(0, arr.length))
    scan.push(null)
    pivots.push({before:right, after:i+1, isBefore:true})
    return i+1
}

export const gravitySort = (arr) => {
    const abacus = []
    const diagram = []
    const sorted = []
    diagram.push(arr.slice(0, arr.length))
    let max = Number.MIN_VALUE
    for (let i = 0; i < arr.length; i++) {
        sorted[i] = i
        if (arr[i] > max) max = arr[i]
    }

    for (let i = 0; i < arr.length; i++) {
        const abacusRow = []
        for (let j = 0; j < max; j++) {
            abacusRow.push(j < arr[i] ? 1 : 0)
        }
        abacus.push(abacusRow)
    }

    let isDone = false
    while (!isDone) {
        isDone = true
        for (let i = 0; i < abacus.length-1; i++) {
            for (let j = 0; j < max; j++) {
                if (abacus[i][j] === 1 && abacus[i+1][j] === 0) {
                    abacus[i][j] = 0
                    abacus[i+1][j] = 1
                    isDone = false
                }
            }
        }
        const diagramState = []
        for (let i = 0; i < abacus.length; i++) {
            const row = abacus[i]
            diagramState.push(row.reduce((accumulated, currentVal) => accumulated + currentVal))
        }
        diagram.push(diagramState)
    }

    return new SortBuffer(diagram, sorted, null, null)
}

const swap = (arr, x, y) => {
    const temp = arr[x]
    arr[x] = arr[y]
    arr[y] = temp
}
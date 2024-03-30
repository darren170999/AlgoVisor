import React from 'react'
import AlgoVisualSortChart from '../components/AlgoVisualSortChart'
import AlgoVisualSortFunctionBar from '../components/AlgoVisualSortFunctionBar'
import Header from '../components/Header'
import { Box, Text, Code } from '@chakra-ui/react';
import {bubbleSort, mergeSort, quickSort, selectionSort, gravitySort} from '../util/SortingAlgorithms'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SelectionSortCode = () => (
    <Box p="4" borderWidth="1px" borderRadius="md" my="4">
      <Text fontSize="20px" color="#fcc015" mb="2">
        Selection Sort Code:
      </Text>
      <SyntaxHighlighter language="python" style={materialDark}>
        {`
            def selection_sort(arr):
                n = len(arr)
                for i in range(n):
                    min_idx = i
                    for j in range(i+1, n):
                        if arr[j] < arr[min_idx]:
                            min_idx = j
                    arr[i], arr[min_idx] = arr[min_idx], arr[i]
            
            # Example usage:
            arr = [64, 25, 12, 22, 11]
            selection_sort(arr)
            print("Sorted array:", arr)
                    `}
      </SyntaxHighlighter>
    </Box>
  );

const BubbleSortCode = () => (
    <Box p="4" borderWidth="1px" borderRadius="md" my="4">
        <Text fontSize="20px" color='#fcc015' mb="2">Bubble Sort Code:</Text>
        <SyntaxHighlighter language="python" style={materialDark}>
        {`
            def bubble_sort(arr):
                n = len(arr)
                for i in range(n-1):
                    for j in range(0, n-i-1):
                        if arr[j] > arr[j+1]:
                            arr[j], arr[j+1] = arr[j+1], arr[j]
            
            # Example usage:
            arr = [64, 25, 12, 22, 11]
            bubble_sort(arr)
            print("Bubble Sort:", arr)
                    `}
      </SyntaxHighlighter>
    </Box>
);
const QuickSortCode = () => (
    <Box p="4" borderWidth="1px" borderRadius="md" my="4">
        <Text fontSize="20px" color='#fcc015' mb="2" >Quick Sort Code:</Text>
        <SyntaxHighlighter language="python" style={materialDark}>
        {`
            def quick_sort(arr):
                if len(arr) <= 1:
                    return arr
                pivot = arr[len(arr)//2]
                left = [x for x in arr if x < pivot]
                middle = [x for x in arr if x == pivot]
                right = [x for x in arr if x > pivot]
                return quick_sort(left) + middle + quick_sort(right)
            
            arr = [64, 25, 12, 22, 11]
            sorted_arr = quick_sort(arr)
            print("Quick Sort:", sorted_arr)
                    `} 
      </SyntaxHighlighter>
    </Box>
);
const GravitySortCode = () => (
    <Box p="4" borderWidth="1px" borderRadius="md" my="4">
        <Text fontSize="20px" color='#fcc015' mb="2">Gravity Sort Code:</Text>
        <SyntaxHighlighter language="python" style={materialDark}>
        {`
            def gravity_sort(arr):
                max_val = max(arr)

                count_list = [0] * (max_val + 1)
            
                for num in arr:
                    count_list[num] += 1
            
                sorted_arr = []
                for i in range(len(count_list)):
                    sorted_arr.extend([i] * count_list[i])
            
                return sorted_arr
            
            arr = [4, 2, 6, 8, 2, 1, 4, 7, 9, 5]
            sorted_arr = gravity_sort(arr)
            print("Original array:", arr)
            print("Sorted array using Gravity Sort:", sorted_arr)
                    `}
      </SyntaxHighlighter>
    </Box>
);
const MergeSortCode = () => (
    <Box p="4" borderWidth="1px" borderRadius="md" my="4">
        <Text fontSize="20px" color='#fcc015' mb="2">Merge Sort Code:</Text>
        <SyntaxHighlighter language="python" style={materialDark}>
        {`
            def merge_sort(arr):
                if len(arr) > 1:
                    mid = len(arr) // 2
                    left_half = arr[:mid]
                    right_half = arr[mid:]
            
                    merge_sort(left_half)
                    merge_sort(right_half)
            
                    i = j = k = 0
            
                    while i < len(left_half) and j < len(right_half):
                        if left_half[i] < right_half[j]:
                            arr[k] = left_half[i]
                            i += 1
                        else:
                            arr[k] = right_half[j]
                            j += 1
                        k += 1
            
                    while i < len(left_half):
                        arr[k] = left_half[i]
                        i += 1
                        k += 1
            
                    while j < len(right_half):
                        arr[k] = right_half[j]
                        j += 1
                        k += 1
            
            arr = [64, 25, 12, 22, 11]
            merge_sort(arr)
            print("Merge Sort:", arr)
                    `}
      </SyntaxHighlighter>
    </Box>
);

class AlgoVisualSorter extends React.Component {
    constructor() {
        super()
        this.state = {
            isRunning:false,
            selectedAlgo:'SELECTION',
            array:[],
            sorted:new Set(),
            arraySize:20,
            scanElement:null,
            pivot:null,
            delay:100,
            buffer:null
        }
        this.setAlgo = this.setAlgo.bind(this)
        this.generateRandomArray = this.generateRandomArray.bind(this)
        this.start = this.start.bind(this)
        this.pause = this.pause.bind(this)
        this.setDelay = this.setDelay.bind(this)
    }
    
    componentDidMount() {
        this.generateRandomArray()
    }

    setDelay(delay) {
        this.setState({delay:delay})
    }

    randInt = (low, high) => {
        const min = Math.ceil(low)
        const max = Math.floor(high)
        return Math.floor(Math.random() * (max-min+1)+min)
    }

    generateRandomArray() {
        if (this.state.isRunning) return
        let arr = []
        for (let i = 0; i < this.state.arraySize; i++) {
            arr.push(this.randInt(this.state.arraySize/4, this.state.arraySize))
        }
        this.setState({array:arr, buffer:null, sorted:new Set(), scanElement:null, pivot:null})
    }

    setAlgo(algo) {
        if (this.state.isRunning) return
        this.setState({selectedAlgo:algo, buffer:null, sorted:new Set(), scanElement:null, pivot:null})
    }

    async cleanup() {
        const createPromise = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.setState({isRunning:false, array:this.state.array})
                    resolve();
                }, this.state.delay)
            })
        }
        await(createPromise(false))
    }

    async playbackSelection(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = this.state.sorted
        while (this.state.isRunning) {
            if (buffer.isEmpty()) {
                this.cleanup()
                break
            }

            const scanElement = buffer.consumeScan()
            let diagram = this.state.array
            if (scanElement === null) {
                diagram = buffer.consumeDiagram()
                sortedSet.add(buffer.consumeSorted())
            }
            await(createPromise(this.state.delay, diagram, sortedSet, scanElement, null))
        }
    }

    async playbackBubble(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = this.state.sorted
        while (this.state.isRunning) {
            if (buffer.isEmpty()) {
                this.cleanup()
                break
            }

            const scanElement = buffer.consumeScan()
            const diagramFrame = buffer.consumeDiagram()
            // console.log(scanElement, diagramFrame)

            if ((scanElement === undefined || scanElement === null) && (diagramFrame === undefined || diagramFrame === null)) {
                sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null))
                continue
            }
            if (scanElement === null) {
                sortedSet.add(buffer.consumeSorted())
            }
            await(createPromise(this.state.delay, diagramFrame, sortedSet, scanElement, null))
        }
    }

    async playbackMerge(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = this.state.sorted
        while (this.state.isRunning) {
            if (buffer.isEmpty()) {
                this.cleanup()
                break
            }
            const scanElement = buffer.consumeScan()

            if (scanElement === undefined) {
                for (let j = 0; j < this.state.array.length; j++) sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null))
            } else {
                const diagram = scanElement === null ? buffer.consumeDiagram() : this.state.array
                await(createPromise(this.state.delay, diagram, sortedSet, scanElement, null))
            }
        }
        const scanElement = buffer.consumeScan()
        if (scanElement === undefined) {
            for (let j = 0; j < this.state.array.length; j++) sortedSet.add(buffer.consumeSorted())
            await(createPromise(this.state.delay, this.state.array, sortedSet, null, null))
        }
    }

    async playbackQuick(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = this.state.sorted
        let pivot = this.state.pivot
        let toRefreshPivot = (this.state.pivot === null || !this.state.pivot.isBefore) ? true : false
        while (this.state.isRunning) {
            if (buffer.isEmpty()) {
                this.cleanup()
                break
            }
            if (toRefreshPivot) {
                pivot = buffer.consumePivots()  
                if (pivot === undefined) pivot = null
                const delay = this.state.pivot === null ? this.state.delay : this.state.delay*10
                await(createPromise(delay, this.state.array, sortedSet, null, pivot))
                toRefreshPivot = false
                continue
            }

            const scanElement = buffer.consumeScan()
            if (scanElement === undefined) { 
                for (let i = 0; i < this.state.array.length; i++) sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null))
            } else if (scanElement === null) {
                const pivotAfter = {before:pivot.before, after:pivot.after, isBefore:false}
                await(createPromise(this.state.delay, buffer.consumeDiagram(), sortedSet, null, pivotAfter))
                toRefreshPivot = true
            } else {
                await(createPromise(this.state.delay, this.state.array, sortedSet, scanElement, pivot))
            }
        }
    }

    async playbackGravity(createPromise) {
        const buffer = this.state.buffer
        const sortedSet = this.state.sorted
        while (this.state.isRunning) {
            if (buffer.isEmpty()) {
                this.cleanup()
                break
            }

            const diagram = buffer.consumeDiagram()
            if (diagram === undefined) {
                for (let i = 0; i < this.state.array.length; i++) sortedSet.add(buffer.consumeSorted())
                await(createPromise(this.state.delay, this.state.array, sortedSet, null, null))
            } else {
                await(createPromise(this.state.delay, diagram, sortedSet, null, null))
            }
        }
    }

    bufferAlgo() {
        let buffer = null
        switch(this.state.selectedAlgo) {
            case 'SELECTION':
                buffer = selectionSort(this.state.array)
                break
            case 'BUBBLE':
                buffer = bubbleSort(this.state.array)
                break
            case 'MERGE':
                buffer = mergeSort(this.state.array)
                break
            case 'QUICK':
                buffer = quickSort(this.state.array)
                break
            case 'GRAVITY':
                buffer = gravitySort(this.state.array)
                break
            default:
        }
        this.setState({buffer:buffer})
    }

    start() {
        const createPromise = (delay, array, sorted, scanElement, pivot) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.setState({array:array, sorted:sorted, scanElement:scanElement, pivot:pivot})
                    resolve();
                }, delay)
            })
        }
        if (this.state.buffer === null) {
            this.bufferAlgo()
        }
        this.setState({isRunning:true}, ()=> {
            switch(this.state.selectedAlgo) {
                case 'SELECTION':
                    this.playbackSelection(createPromise)
                    break
                case 'BUBBLE':
                    this.playbackBubble(createPromise)
                    break
                case 'MERGE':
                    this.playbackMerge(createPromise)
                    break
                case 'QUICK':
                    this.playbackQuick(createPromise)
                    break
                case 'GRAVITY':
                    this.playbackGravity(createPromise)
                    break
                default:
            }
        })
    }

    pause() {
        this.setState({isRunning:false})
    }
    renderAlgorithmCode() {
        const { selectedAlgo } = this.state;

        switch (selectedAlgo) {
            case 'SELECTION':
                return <SelectionSortCode />;
            case 'BUBBLE':
                return <BubbleSortCode />;
            case 'MERGE':
                return <MergeSortCode />;
            case 'QUICK':
                return <QuickSortCode />;
            case 'GRAVITY':
                return <GravitySortCode />;
            default:
                return null;
        }
    }
    render() {
        const pivotBefore = (this.state.pivot !== null && this.state.pivot.isBefore) ? this.state.pivot.before : null
        const pivotAfter = (this.state.pivot !== null && !this.state.pivot.isBefore) ? this.state.pivot.after : null
        return (
            <>
                <Header/>
                <div>
                    <AlgoVisualSortFunctionBar
                        isRunning={this.state.isRunning}
                        selectedAlgo={this.state.selectedAlgo}
                        setAlgo={this.setAlgo}
                        delay={this.state.delay}
                        setDelay={this.setDelay}
                        generateRandomArray={this.generateRandomArray}
                        start={this.start}
                        pause={this.pause}
                    />
                    <AlgoVisualSortChart
                        array={this.state.array}
                        sorted={this.state.sorted}
                        scanElement={this.state.scanElement}
                        pivotBefore={pivotBefore}
                        pivotAfter={pivotAfter}
                    />
                </div>
                <Box maxWidth={"7xl"} mt={4} marginLeft={"75px"}>
                    {this.renderAlgorithmCode()}
                </Box>
            </>
        )
    }
}

export default AlgoVisualSorter
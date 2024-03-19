import React from 'react'
import Grid from '../components/Grid'
import {astar, bfs, dfs, dijkstra} from '../util/GraphAlgorithms'
import '../components/Grid.css'
import {gridIdx} from '../util/GridDraw'
import Buffer from '../util/Buffer'
import {mazeRecursiveDiv} from '../util/MazeGenerationAlgorithms'
import AlgoVisualFunctionBar from './AlgoVisualFunctionBar'
import Header from '../components/Header'
import PathLegend from './PathLegend'
import { Box, Text } from '@chakra-ui/react'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const BfsCode = () => (
    <Box p="4" borderWidth="1px" borderRadius="md" my="4">
      <Text fontSize="20px" color="#fcc015" mb="2">
        Breadth First Search Code:
      </Text>
      <SyntaxHighlighter language="python" style={materialDark}>
        {`
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)

    while queue:
        current_node = queue.popleft()
        print(current_node, end=' ')

        for neighbor in graph[current_node]:
            if neighbor not in visited:
                queue.append(neighbor)
                visited.add(neighbor)

# Example usage:
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F', 'G'],
    'D': ['B'],
    'E': ['B'],
    'F': ['C'],
    'G': ['C']
}

start_node = 'A'
print("BFS Traversal:")
bfs(graph, start_node)
                    `}
      </SyntaxHighlighter>
    </Box>
  );

const DfsCode = () => (
    <Box p="4" borderWidth="1px" borderRadius="md" my="4">
        <Text fontSize="20px" color='#fcc015' mb="2">Depth First Search Code:</Text>
        <SyntaxHighlighter language="python" style={materialDark}>
        {`
def dfs(graph, start, visited=None):
if visited is None:
    visited = set()
visited.add(start)
print(start, end=' ')

for neighbor in graph[start]:
    if neighbor not in visited:
        dfs(graph, neighbor, visited)

# Example usage:
graph = {
'A': ['B', 'C'],
'B': ['A', 'D', 'E'],
'C': ['A', 'F', 'G'],
'D': ['B'],
'E': ['B'],
'F': ['C'],
'G': ['C']
}

start_node = 'A'
print("DFS Traversal:")
dfs(graph, start_node)
                    `}
      </SyntaxHighlighter>
    </Box>
);
const DijkstraCode = () => (
    <Box p="4" borderWidth="1px" borderRadius="md" my="4">
        <Text fontSize="20px" color='#fcc015' mb="2" >Dijkstra Code:</Text>
        <SyntaxHighlighter language="python" style={materialDark}>
        {`
import heapq

def dijkstra(graph, start):
    # Initialize distances to all nodes as infinity
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    # Initialize priority queue with start node
    pq = [(0, start)]
    
    while pq:
        # Pop the node with the smallest distance
        current_distance, current_node = heapq.heappop(pq)
        
        # If this node has already been visited with a shorter path, skip it
        if current_distance > distances[current_node]:
            continue
        
        # Update distances to neighbors
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances

# Example usage:
graph = {
    'A': {'B': 1, 'C': 4},
    'B': {'A': 1, 'C': 2, 'D': 5},
    'C': {'A': 4, 'B': 2, 'D': 1},
    'D': {'B': 5, 'C': 1}
}

start_node = 'A'
distances = dijkstra(graph, start_node)

print("Shortest distances from node", start_node + ":")
for node, distance in distances.items():
    print("To node", node + ":", distance)

                    `} 
      </SyntaxHighlighter>
    </Box>
);
const AStarCode = () => (
    <Box p="4" borderWidth="1px" borderRadius="md" my="4">
        <Text fontSize="20px" color='#fcc015' mb="2">A Star Code:</Text>
        <SyntaxHighlighter language="python" style={materialDark}>
        {`
import heapq

class Node:
    def __init__(self, state, parent=None, action=None, cost=0, heuristic=0):
        self.state = state
        self.parent = parent
        self.action = action
        self.cost = cost
        self.heuristic = heuristic
        self.total_cost = cost + heuristic

    def __lt__(self, other):
        return self.total_cost < other.total_cost

def astar_search(initial_state, goal_test, successors, heuristic):
    frontier = []
    explored = set()
    initial_node = Node(state=initial_state, cost=0, heuristic=heuristic(initial_state))
    heapq.heappush(frontier, initial_node)

    while frontier:
        current_node = heapq.heappop(frontier)
        current_state = current_node.state

        if goal_test(current_state):
            path = []
            while current_node:
                path.append((current_node.state, current_node.action))
                current_node = current_node.parent
            return path[::-1]

        explored.add(current_state)

        for action, next_state, step_cost in successors(current_state):
            if next_state not in explored:
                new_cost = current_node.cost + step_cost
                new_heuristic = heuristic(next_state)
                new_node = Node(state=next_state, parent=current_node, action=action, cost=new_cost, heuristic=new_heuristic)
                heapq.heappush(frontier, new_node)

    return None

# Example usage:
def h(state):
    # Simple heuristic: Manhattan distance to goal
    goal_state = (2, 2)
    return abs(state[0] - goal_state[0]) + abs(state[1] - goal_state[1])

def successors(state):
    x, y = state
    moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # up, down, left, right
    for dx, dy in moves:
        new_x, new_y = x + dx, y + dy
        if 0 <= new_x < 3 and 0 <= new_y < 3:  # assuming a 3x3 grid
            yield (dx, dy), (new_x, new_y), 1  # action, next_state, step_cost

def goal_test(state):
    return state == (2, 2)

initial_state = (0, 0)
path = astar_search(initial_state, goal_test, successors, h)
if path:
    print("A* Path found:", path)
else:
    print("No path found.")

                    `}
      </SyntaxHighlighter>
    </Box>
);
class AlgoVisualPathFinder extends React.Component {
    constructor() {
        super()
        this.state = {
            visitedNodes:new Set(),
            pathToTarget:new Set(),
            wallNodes:new Set(),
            weakWallNodes:new Set(),
            buffer:new Buffer([],[]),
            sourceNode:{x:5, y:20},
            targetNode:{x:7, y:30},
            gridSize:{numRows:25, numCols:45},
            isUpdateSourceNodeMode:false,
            isUpdateTargetNodeMode:false,
            selectedAlgo:'BFS',
            isDrawingMode:false,
            selectedWallType:'NON-PASSABLE WALL',
            isRunning:false,
            isGeneratingMaze:false,
            delay:100
        }
        this.updateSourceNode = this.updateSourceNode.bind(this)
        this.setUpdateSourceNodeMode = this.setUpdateSourceNodeMode.bind(this)
        this.updateTargetNode = this.updateTargetNode.bind(this)
        this.setUpdateTargetNodeMode = this.setUpdateTargetNodeMode.bind(this)
        this.setAlgo = this.setAlgo.bind(this)
        this.bufferAlgo = this.bufferAlgo.bind(this)
        this.reset = this.reset.bind(this)
        this.setDrawingMode = this.setDrawingMode.bind(this)
        this.updateDrawnNodes = this.updateDrawnNodes.bind(this)
        this.setWallType = this.setWallType.bind(this)
        this.playback = this.playback.bind(this)
        this.pausePlayback = this.pausePlayback.bind(this)
        this.start = this.start.bind(this)
        this.clearVisuals = this.clearVisuals.bind(this)
        this.generateMaze = this.generateMaze.bind(this)
        this.setDelay = this.setDelay.bind(this)
    }

    updateSourceNode(sourceNode) {
        this.setState({sourceNode:sourceNode, isUpdateSourceNodeMode:false})
    }

    updateTargetNode(targetNode) {
        this.setState({targetNode:targetNode, isUpdateTargetNodeMode:false})
    }

    setUpdateSourceNodeMode() {
        if (this.state.buffer.isEmpty())
            this.setState({isUpdateSourceNodeMode:true})
    }

    setUpdateTargetNodeMode() {
        if (this.state.buffer.isEmpty())
            this.setState({isUpdateTargetNodeMode:true})
    }

    setAlgo(algo) {
        if (this.state.isRunning) return
        this.setState({selectedAlgo:algo, visitedNodes:new Set(), pathToTarget:new Set(), buffer: new Buffer([], [])})
    }

    bufferAlgo() {
        let buffer = null
        switch(this.state.selectedAlgo) {
            case 'BFS':
                buffer = bfs(this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes)
                break
            case 'DFS':
                buffer = dfs(this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes)
                break
            case 'DIJKSTRA':
                buffer = dijkstra(this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes, this.state.weakWallNodes)
                break
            case 'ASTAR':
                buffer = astar(this.state.sourceNode, this.state.targetNode, this.state.gridSize, this.state.wallNodes, this.state.weakWallNodes)
                break
            default:
                return
        }
        buffer.update(this.state.visitedNodes.size)
        this.setState({buffer:buffer})
    }

    async start() {
        if (this.state.isGeneratingMaze || this.state.isRunning) return
        if (this.state.buffer.isEmpty()) {
            await(new Promise((resolve) => {
                this.clearVisuals()
                resolve()
            }))
        }
        await(new Promise((resolve) => {
            this.bufferAlgo()
            resolve()
        }))
        this.playback()
    }

    playback() {
        const createPromise = (visitedNodes, pathToTarget) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.setState({visitedNodes:visitedNodes, pathToTarget:pathToTarget})
                    resolve();
                }, this.state.delay)
            })
        }
        this.setState({isRunning:true}, async ()=> {
            while (this.state.isRunning) {
                if (this.state.buffer.visitedIsEmpty() && this.state.buffer.pathIsEmpty()) {
                    this.setState({isRunning:false})
                    break
                }
                let visitedNodes = new Set(this.state.visitedNodes)
                let pathToTarget = new Set(this.state.pathToTarget)
                if (!this.state.buffer.visitedIsEmpty()) {
                    visitedNodes.add(this.state.buffer.consumeVisited())
                } else {
                    pathToTarget.add(this.state.buffer.consumePath())
                }
                await(createPromise(visitedNodes, pathToTarget))
            }
        })
    }

    pausePlayback() {
        this.setState({isRunning:false})
    }

    setDrawingMode(isDrawingMode) {
        this.setState({isDrawingMode:isDrawingMode})
    }

    updateDrawnNodes(nodeIndex) {
        if (this.state.isRunning) return;
        let updatedWallNodes = this.state.selectedWallType === 'NON-PASSABLE WALL' ? new Set(this.state.wallNodes) : new Set(this.state.weakWallNodes)
        updatedWallNodes.add(gridIdx(nodeIndex, this.state.gridSize.numCols))
        let updatedState = this.state.selectedWallType === 'NON-PASSABLE WALL' ? {wallNodes:updatedWallNodes} : {weakWallNodes:updatedWallNodes}
        this.setState(updatedState)
    }

    reset() {
        this.setState({visitedNodes:new Set(), pathToTarget:new Set(), wallNodes:new Set(), weakWallNodes:new Set(), buffer:new Buffer([], [])})
    }

    clearVisuals() {
        this.setState({visitedNodes:new Set(), pathToTarget:new Set(), buffer:new Buffer([], [])})
    }

    setWallType(wallType) {
        this.setState({selectedWallType:wallType})
    }

    setDelay(delay) {
        this.setState({delay:delay})
    }

    generateMaze() {
        if (this.state.isRunning || this.state.isGeneratingMaze) return
        const createPromise = (wallNodes) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.setState({wallNodes:wallNodes})
                    resolve();
                }, this.state.delay)
            })
        }
        const res = mazeRecursiveDiv(this.state.gridSize, this.state.sourceNode, this.state.targetNode)
        const wallNodes = new Set()
        this.setState({isGeneratingMaze:true, visitedNodes:new Set(), pathToTarget:new Set(), wallNodes:new Set(), weakWallNodes:new Set()}, async ()=>{
            for (let wallNode of res) {
                wallNodes.add(wallNode)
                await(createPromise(wallNodes))
            }
            this.setState({isGeneratingMaze:false})
        })
    }
    renderPathFindingCode() {
        const { selectedAlgo } = this.state;

        switch (selectedAlgo) {
            case 'BFS':
                return <BfsCode />;
            case 'DFS':
                return <DfsCode />;
            case 'DIJKSTRA':
                return <DijkstraCode />;
            case 'ASTAR':
                return <AStarCode />;
            default:
                return null;
        }
    }

    render() {
        const nodeModifier = {
            setUpdateSourceNodeMode:this.setUpdateSourceNodeMode,
            setUpdateTargetNodeMode:this.setUpdateTargetNodeMode,
            updateSourceNode:this.updateSourceNode,
            updateTargetNode:this.updateTargetNode,
            isUpdateSourceNodeMode:this.state.isUpdateSourceNodeMode,
            isUpdateTargetNodeMode:this.state.isUpdateTargetNodeMode,
            setDrawingMode:this.setDrawingMode,
            isDrawingMode:this.state.isDrawingMode,
            updateDrawnNodes:this.updateDrawnNodes
        }
        return (
            <>
                <Header/>
                <Box margin="auto" width="85%" overflow="hidden">
                    <AlgoVisualFunctionBar 
                        genMaze={this.generateMaze} 
                        setAlgo={this.setAlgo} 
                        setDelay={this.setDelay} 
                        start={this.start} 
                        pause={this.pausePlayback} 
                        reset={this.reset} 
                        setWallType={this.setWallType} 
                        isRunning={this.state.isRunning} 
                        delay={this.state.delay}
                    />
                    <PathLegend/>
                    <Grid 
                        gridState={this.state} 
                        nodeModifier={nodeModifier}
                    />
                    <Box maxWidth={"6xl"} mt={24} marginLeft={"35px"}>
                        {this.renderPathFindingCode()}
                    </Box>
                </Box>
            </>
        )
    }
}

export default AlgoVisualPathFinder
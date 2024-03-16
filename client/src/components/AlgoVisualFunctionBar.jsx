import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import './FunctionBar.css';
import { Box, Button, Select } from '@chakra-ui/react';
class AlgoVisualFunctionBar extends React.Component {
    render() {
        return (
            <Box className="button_container">
                <Button onClick={()=>this.props.genMaze()} colorScheme="red"> 
                    GENERATE 
                </Button>
                <Select onChange={(event)=>this.props.setAlgo(event.target.value)} color="white">
                    <option value="BFS"> BREADTH-FIRST SEARCH </option>
                    <option value="DFS"> DEPTH-FIRST SEARCH </option>
                    <option value="DIJKSTRA"> DIJKSTRA'S ALGORITHM </option>
                    <option value="ASTAR"> ASTAR (MANHATTAN) </option>
                </Select>
                <Select onChange={(event)=>this.props.setWallType(event.target.value)} color="white">
                    <option value="NON-PASSABLE WALL"> NON-PASSABLE WALL </option>
                    <option value="WEAK WALL"> WEAK WALL - WEIGHT 50</option>
                </Select>
                <Button onClick={()=>this.props.isRunning ? this.props.pause() : this.props.start()} colorScheme="red">
                    {this.props.isRunning ? 'PAUSE' : 'RUN'}
                </Button>
                <Box color="white" fontWeight={'bold'}>
                    SPEED
                    <RangeSlider 
                        value={(250 - this.props.delay)/50}
                        onChange={changeEvent => {
                            const delay = 250 - (changeEvent.target.value*50)
                            this.props.setDelay(delay)}
                        }
                        min={1}
                        max={5}                              
                    />
                </Box>
                <Button onClick={()=>this.props.reset()}>
                    RESET
                </Button>
            </Box>
        )
    }
}


export default AlgoVisualFunctionBar;

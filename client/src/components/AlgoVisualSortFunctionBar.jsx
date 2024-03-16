import React from 'react';
import { Box, Button, Select } from '@chakra-ui/react';
import RangeSlider from 'react-bootstrap-range-slider';
import './SortFunctionBar.css';

class AlgoVisualSortFunctionBar extends React.Component {
    render() {
        return (
            <Box className="sort_button_container">
                <Button onClick={() => this.props.generateRandomArray()} colorScheme="red">
                    SHUFFLE ARRAY
                </Button>
                <Select onChange={(event) => this.props.setAlgo(event.target.value)} color="white">
                    {/* <option value="">Please Select</option> */}
                    <option value="SELECTION"> SELECTION SORT </option>
                    <option value="BUBBLE"> BUBBLE SORT </option>
                    <option value="MERGE"> MERGE SORT </option>
                    <option value="QUICK"> QUICK SORT </option>
                    <option value="GRAVITY"> GRAVITY SORT </option>
                </Select>
                <Button onClick={() => this.props.isRunning ? this.props.pause() : this.props.start()} colorScheme="red">
                    {this.props.isRunning ? 'PAUSE' : 'RUN'}
                </Button>
                <Box color="white">
                    SPEED
                    <RangeSlider 
                        value={(300 - this.props.delay)/50}
                        onChange={changeEvent => {
                            const delay = 300 - (changeEvent.target.value*50)
                            this.props.setDelay(delay)}
                        }
                        min={1}
                        max={5}                              
                    />
                </Box>
            </Box>
        )
    }
}
export default AlgoVisualSortFunctionBar;

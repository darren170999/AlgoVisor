import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import './FunctionBar.css';
import { Box, Button, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Icon } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
class AlgoVisualFunctionBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInstructionsModal: false,
            currentStep: 0,
            instructions: [
                "Click GENERATE to create a maze of your choice.",
                "SELECT a path finding algorithm.",
                "RUN or PAUSE the visualization.",
                "Slide the SPEED meter to adjust the speed of the visualization.",
                "CODE of the path finding functionality is shown below",
                "Hit RESET to clear the maze output."
            ]
        };
    }

    handleModalClose = () => {
        this.setState({ showInstructionsModal: false });
    };

    handleNextStep = () => {
        const { currentStep, instructions } = this.state;
        if (currentStep < instructions.length - 1) {
            this.setState({ currentStep: currentStep + 1 });
        } else {
            this.setState({ showInstructionsModal: false, currentStep: 0 });
        }
    };

    render() {
        const { showInstructionsModal, currentStep, instructions } = this.state;
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
                <Button size={20} position="fixed" top={24} right={12} onClick={() => this.setState({ showInstructionsModal: true })}>
                    <Icon boxSize={10} as={InfoOutlineIcon}/>
                </Button>
                <Modal isOpen={showInstructionsModal} onClose={this.handleModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Instructions</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p>{instructions[currentStep]}</p>
                            <Button onClick={this.handleNextStep} colorScheme="blue">
                                {currentStep === instructions.length - 1 ? 'Close' : 'Next'}
                            </Button>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        )
    }
}


export default AlgoVisualFunctionBar;

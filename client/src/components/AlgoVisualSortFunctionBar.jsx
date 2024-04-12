import React from 'react';
import { Box, Button, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import RangeSlider from 'react-bootstrap-range-slider';
import './SortFunctionBar.css';

class AlgoVisualSortFunctionBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInstructionsModal: false,
            currentStep: 0,
            instructions: [
                "Shuffle the array to randomize elements.",
                "Select a sorting algorithm.",
                "Start or pause the sorting visualization.",
                "Adjust the speed of the visualization.",
                "Code of the sorting functionality is shown below"
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
            <Box className="sort_button_container">
                <Button onClick={() => this.props.generateRandomArray()} colorScheme="red">
                    SHUFFLE ARRAY
                </Button>
                <Select onChange={(event) => this.props.setAlgo(event.target.value)} color="white">
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
                        value={(300 - this.props.delay) / 50}
                        onChange={(changeEvent) => {
                            const delay = 300 - changeEvent.target.value * 50;
                            this.props.setDelay(delay);
                        }}
                        min={1}
                        max={5}
                    />
                </Box>
                <Button onClick={() => this.setState({ showInstructionsModal: true })} colorScheme="red">
                    INSTRUCTIONS
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
        );
    }
}
export default AlgoVisualSortFunctionBar;

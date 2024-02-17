import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onViewPerformance: () => void; // Callback function to view performance
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onViewPerformance }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Success!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Your solution has passed. Click the button below to view performance.
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onViewPerformance}>
                        View Performance
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SuccessModal;

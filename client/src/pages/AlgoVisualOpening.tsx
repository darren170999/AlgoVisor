import { VStack } from "@chakra-ui/react";
import {useState, useEffect} from "react";
function AlgoVisualOpening() {
    
    return (
    <>
        <VStack 
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bg={[
            '#ff7425',
        ]}
        w='100%'>
            <img src={require('../AlgoVisual.gif')} alt="Logo" />

        </VStack>

    </>

    );
}

export default AlgoVisualOpening;

import { VStack } from "@chakra-ui/react";
import {useState, useEffect, useCallback} from "react";
import RedirectToHome from "../components/RedirectToHome";
// import { useNavigate } from "react-router-dom";
function AlgoVisualOpening() {
    return (
    <>
        <RedirectToHome/>
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

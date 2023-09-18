import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import AlgoVisualOpening from "./pages/AlgoVisualOpening";

export default function App() {

  return(
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<AlgoVisualOpening/>}/>
        </Routes>
      </Router>

    </ChakraProvider>
  )

}

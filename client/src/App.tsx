import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import AlgoVisualOpening from "./pages/AlgoVisualOpening";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";

export default function App() {

  return(
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<AlgoVisualOpening/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/accounts" element={<Accounts/>}/>
          <Route path="/concepts" element={<></>}/>
          <Route path="/tutorials" element={<></>}/>
          <Route path="/concepts" element={<></>}/>
        </Routes>
      </Router>

    </ChakraProvider>
  )

}

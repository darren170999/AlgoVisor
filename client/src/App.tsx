import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  ChakraProvider,
  Code,
  theme,
} from "@chakra-ui/react";
import AlgoVisualOpening from "./pages/AlgoVisualOpening";
import Landing from "./pages/Landing";
import Accounts from "./pages/Accounts";
import Home from "./pages/Home";
import Concepts from "./pages/Concepts";
import Visualizer from "./pages/Visualizer";
import Error404 from "./pages/Error404";

export default function App() {

  return(
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<AlgoVisualOpening/>}/>
          <Route path="/landing" element={<Landing/>}/>
          <Route path="/accounts" element={<Accounts/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/visualizer" element={<Visualizer/>}/>
          <Route path="/concepts" element={<Concepts/>}/>
          <Route path="/code" element={<Code/>}/>
          
          <Route path='*' element={<Navigate to='/404'/>}/>
          <Route path='/404'element={<Error404/>}/>
        </Routes>
      </Router>

    </ChakraProvider>
  )

}

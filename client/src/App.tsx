import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import AlgoVisualOpening from "./pages/AlgoVisualOpening";
import Landing from "./pages/Landing";
import Accounts from "./pages/Accounts";
import Home from "./pages/Home";
import Concepts from "./pages/Concepts";
import Visualizer from "./pages/Visualizer";
import Error404 from "./pages/Error404";
import MonacoCode from "./pages/MonacoCode";
import Tutorials from "./pages/Tutorials";
import Admin from "./pages/Admin";
import AdminQuestion from "./pages/AdminQuestion";
import AdminTestcase from "./pages/AdminTestcase";
import AdminCourse from "./pages/AdminCourse";

export default function App() {

  return(
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<AlgoVisualOpening/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/admin/question" element={<AdminQuestion/>}/>
          <Route path="/admin/testcase" element={<AdminTestcase/>}/>
          <Route path="/admin/course" element={<AdminCourse/>}/>
          {/* <Route path="/admin/courses" element={<Admin/>}/> */}
          <Route path="/landing" element={<Landing/>}/>
          <Route path="/accounts" element={<Accounts/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/visualizer" element={<Visualizer/>}/>
          <Route path="/concepts" element={<Concepts/>}/>
          <Route path="/tutorials" element={<Tutorials/>}>
            {/* <Route path="code" element={<MonacoCode/>}/> */}
            {/* <Route path="question/:questionId" element={<MonacoCode />} /> */}
          </Route>
          <Route path="/tutorials/code/:qnid" element={<MonacoCode />} />
          <Route path='*' element={<Navigate to='/404'/>}/>
          <Route path='/404'element={<Error404/>}/>
        </Routes>
      </Router>

    </ChakraProvider>
  )

}

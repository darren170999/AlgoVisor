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
import Visualizer from "./pages/AlgoVisual";
import Error404 from "./pages/Error404";
import MonacoCode from "./pages/MonacoCode";
import Tutorials from "./pages/Tutorials";
import Admin from "./pages/Admin";
import AdminQuestion from "./pages/AdminQuestion";
import AdminTestcase from "./pages/AdminTestcase";
import AdminCourse from "./pages/AdminCourse";
import PerformancePage from "./pages/PerformancePage";
import AdminDatabase from "./pages/AdminDatabase";
import AdminDelete from "./pages/AdminDelete";
import Townhall from "./pages/Townhall";

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
          <Route path="/admin/delete" element={<AdminDelete/>}/>
          <Route path="/admin/database" element={<AdminDatabase/>}/>
          <Route path="/landing" element={<Landing/>}/>
          <Route path="/accounts" element={<Accounts/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/visualizer" element={<Visualizer/>}/>
          <Route path="/townhall" element={<Townhall/>}/>
          <Route path="/concepts" element={<Concepts/>}/>
          <Route path="/tutorials" element={<Tutorials/>}/>
          <Route path="/tutorials/code/:qnid" element={<MonacoCode />} />
          <Route path="/tutorials/performance" element={<PerformancePage/>}></Route>
          <Route path='*' element={<Navigate to='/404'/>}/>
          <Route path='/404'element={<Error404/>}/>
        </Routes>
      </Router>

    </ChakraProvider>
  )

}

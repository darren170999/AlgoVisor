import { Box, Button, Link, Stack } from "@chakra-ui/react";
import Header from "../components/Header";

function AdminDatabase() {
  return (
    <>
      <Header />
      <Box p={0} m={0} style={{ width: "100vw", height: "100vh" }}>
        <iframe
          style={{
            background: "#21313C",
            border: "none",
            borderRadius: "2px",
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            width: "100%",
            height: "100%",
          }}
          src="https://charts.mongodb.com/charts-algovisualdb-ddoxm/embed/dashboards?id=aa6a7a03-d194-4ddc-8226-e5fe58708086&theme=dark&autoRefresh=false&maxDataAge=-1&showTitleAndDesc=true&scalingWidth=scale&scalingHeight=scale"
          title="MongoDB Charts Dashboard"
        ></iframe>
      </Box>
    </>
  );
}

export default AdminDatabase;

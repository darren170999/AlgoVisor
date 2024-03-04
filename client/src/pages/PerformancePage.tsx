import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Grid, GridItem, Card } from "@chakra-ui/react";
import GraphComponent from "../components/GraphComponent";
import { fetchAllAttempts } from "../api/fetchAllAttempts";

interface AttemptData {
    speed?: number;
    memory?: number;
}

function PerformancePage() {
    const [speeds, setSpeeds] = useState<number[]>([]);
    const [memories, setMemories] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllAttempts();
                const validAttempts = data.data.filter((attempt: AttemptData) => attempt.speed !== undefined || attempt.memory !== undefined);
                const speedsData = validAttempts.map((attempt: AttemptData) => attempt.speed).filter((speed: number) => !isNaN(speed));
                const memoriesData = validAttempts.map((attempt: AttemptData) => attempt.memory).filter((memory: number) => !isNaN(memory));
                setSpeeds(speedsData);
                setMemories(memoriesData);
            } catch (error) {
                console.error("Error fetching attempts:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <Grid templateColumns="1fr 1fr" gap={4}>
                <GridItem>
                    <GraphComponent title="Memory Graph" data={memories} />
                </GridItem>
                <GridItem>
                    <GraphComponent title="Speed Graph" data={speeds} />
                </GridItem>
            </Grid>
        </>
    );
}

export default PerformancePage;

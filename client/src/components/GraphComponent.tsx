import { Card, CardBody } from "@chakra-ui/react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

type GraphProps = {
    title: string;
    data: number[];
};

function GraphComponent({ title, data }: GraphProps) {
    return (
        <Card>
            <CardBody>
                <h2>{title}</h2>
                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryLine
                        data={data.map((value, index) => ({ x: index, y: value }))}
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc" }
                        }}
                    />
                </VictoryChart>
            </CardBody>
        </Card>
    );
}

export default GraphComponent;

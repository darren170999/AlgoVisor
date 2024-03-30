import { Card, CardBody } from "@chakra-ui/react";
import { ID, VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";

type GraphProps = {
    title: string;
    data: number[];
    current: string | null;
};

function GraphComponent({ title, data, current }: GraphProps) {
    // console.log(title);

    // Convert data to integers and floor the values
    const processedData = data.map(value => Math.floor(parseInt(value.toString())));

    const currentPoint = current !== null ? Math.floor(parseInt(current)) : null;

    // Count frequency of each value in the data array
    const frequencyMap = new Map<number, number>();
    processedData.forEach((value) => {
        frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
    });
    // console.log(frequencyMap);

    // Extract unique values and their frequencies
    const uniqueValues = Array.from(frequencyMap.keys());
    const frequencies = uniqueValues.map((value) => frequencyMap.get(value) || 0);
    let userRanking = 1;
    for (let i = uniqueValues.length - 1; i >= 0; i--) {
        if (currentPoint && currentPoint > uniqueValues[i]) {
            userRanking += frequencies[i];
        } else {
            break;
        }
    }
    // console.log(uniqueValues);

    return (
        <Card>
            <CardBody>
                <h2>{title}</h2> {current}
                <VictoryChart 
                theme={VictoryTheme.material} 
                padding={{ top: 20, bottom: 50, left: 50, right: 20 }}
                width={300} // Set width to make the graph smaller
                height={200} // Set height to make the graph smaller
                >
                    <VictoryAxis
                        dependentAxis
                        label="Frequency"
                        style={{ axisLabel: { padding: 30 } }}
                        tickCount={Math.max(...frequencies) + 1} // Set tick count to the maximum frequency + 1
                    />
                    <VictoryAxis
                        label="Value"
                        style={{ axisLabel: { padding: 30 }, tickLabels: { fontSize: 10 } }} // Hide tick labels
                        tickValues={uniqueValues}
                    />
                    <VictoryBar
                        data={uniqueValues.map((value) => ({ x: value, y: frequencyMap.get(value) || 0 }))}
                        style={{
                            data: {
                                fill: (dataProps) => {
                                    // Highlight bar if it represents the user's current point
                                    const d = dataProps.datum;
                                    const roundedX = parseFloat(d.x.toFixed(1));
                                    const roundedCurrentPoint = currentPoint !== null ? parseFloat(currentPoint.toFixed(3)) : null;
                                    return roundedX === roundedCurrentPoint ? "#c43a31" : "#000";
                                },
                                stroke: "#3182ce",
                                strokeWidth: 2,
                            },
                            parent: { border: "1px solid #ccc" }
                        }}
                    />
                </VictoryChart>
            <text x={350} y={240} textAnchor="end" fontSize="14px" fill="#000">
                Your Ranking: {userRanking + 1}
            </text>
            <text> 
                You are doing better than {(data.length - userRanking)/data.length *100} % of people
            </text>
            </CardBody>
        </Card>
        
    );
}

export default GraphComponent;


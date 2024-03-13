import React, { Component } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';

interface AlgoVisualSortChartProps {
    array: number[];
    pivotBefore: number | null;
    pivotAfter: number | null;
    sorted: Set<number>;
    scanElement: number | null;
}

const generateData = (array: number[]) => {
    return array.map(x => {
        return { value: x };
    });
};

const colors = ["#84d88a", "#8884d8", "#66FCF1", "#525452", "#b9bdb9"];

class AlgoVisualSortChart extends Component<AlgoVisualSortChartProps> {
    render() {
        const data = generateData(this.props.array);
        return (
            <div style={{ margin: 'auto', width: '85%', overflow: 'hidden' }}>
                <ResponsiveContainer width="100%" height={600}>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 20,
                            bottom: 20,
                        }}
                    >
                        <Bar isAnimationActive={false} dataKey="value" fill={"#8884d8"} label={{ position: 'bottom' }}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        this.props.pivotBefore === index ? colors[4] :
                                            this.props.pivotAfter === index ? colors[3] :
                                                this.props.sorted.has(index) ? colors[0] :
                                                    index === this.props.scanElement ? colors[2] :
                                                        colors[1]
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default AlgoVisualSortChart;

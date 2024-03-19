import React from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import SortLegend from './SortLegend';
import { Flex, Box} from '@chakra-ui/react';

const generateData = (array) => {
  const data = array.map(x => {
    return {value:x}
  })
  return data
}

const colors = ["grey", "white", "blue", "lightgrey", "red"]

export default class AlgoVisualSortChart extends React.Component {
  render() {
    const data = generateData(this.props.array)
    return (
      <Box margin="auto" width="85%" overflow="hidden" >
        <SortLegend/>
        <ResponsiveContainer width="100%" height={500}>
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
            <Bar isAnimationActive={false} dataKey="value" fill={"#8884d8"} label={{position:'bottom'}}>
              {data.map((entry, index) => (
                <Cell 
                key={`cell-${index}`} 
                fill={this.props.pivotBefore === index ? colors[4] : this.props.pivotAfter === index ? colors[3] : this.props.sorted.has(index) ? colors[0] : index === this.props.scanElement ? colors[2] : colors[1]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    );
  }
}
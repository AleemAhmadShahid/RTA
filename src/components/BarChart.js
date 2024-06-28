import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <text x={x - 10} y={y} textAnchor="end" fill="#666" dy={5} fontSize={14}>
      {payload.value}
    </text>
  );
};
const renderLegend = (props) => {
  const { payload } = props;

  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      {payload.map((entry, index) => (
        <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
          <div style={{
            width: 10,
            height: 10,
            backgroundColor: entry.color,
            borderRadius: '50%',
            marginRight: 5
          }} />
          <span style={{ fontSize: 14 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};
const BarChartCom = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400,overflowX:"auto" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 30, right: 30, left: 140, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" tick={<CustomYAxisTick />}/>
          <Tooltip />
          <Legend content={renderLegend} />
          <Bar dataKey="New" stackId="a" fill="#8884d8" barSize={10} fontSize={10}/>
          <Bar dataKey="Interviewed" stackId="a" fill="#32CBF1" />
          <Bar dataKey="Submitted" stackId="a" fill="#FF681F" />
          <Bar dataKey="Hired" stackId="a" fill="#FFCB2E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCom;

// 
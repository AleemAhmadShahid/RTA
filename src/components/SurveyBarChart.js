import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomBar = ({ fill, x, y, width, height, dataKey, payload }) => {
    return <Rectangle x={x} y={y} width={width} height={height} fill={payload.color} />;
  };

const SurveyBarChart=({data})=> {
  

  
    return (
        <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
        //   width={400}
        //   height={100}
          layout="vertical"
          data={data}
          margin={{
            top: 60,
            right: 40,
            left: 30,
            bottom: 30,
          }}
          barCategoryGap="30%" 
           barGap={2} 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" barSize={20} shape={<CustomBar />} />
          {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </BarChart>
      </ResponsiveContainer>
      </div>
    );
  }
export default SurveyBarChart;
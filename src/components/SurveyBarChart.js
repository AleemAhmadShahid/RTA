import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomBar = ({ fill, x, y, width, height, dataKey, payload }) => {
  return <Rectangle x={x} y={y} width={width} height={height} fill={payload.color} />;
};

const SurveyBarChart = ({ data, layout = "vertical" , height = "400px",showPvLabel = true}) => {
  const isVertical = layout === "vertical";

  return (
    <div style={{ width: '100%',  height  }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout={layout}
          data={data}
          margin={{
            top: 30,
            right: 40,
            left: 10,
            bottom: 20,
          }}
          // barCategoryGap="10%"
          // barGap={2}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {isVertical ? <XAxis type="number" /> : <XAxis type="category" dataKey="name" />}
          {isVertical ? <YAxis type="category" dataKey="name" /> : <YAxis type="number" />}
          <Tooltip />
          {showPvLabel && <Legend />}
          <Bar dataKey="pv" barSize={20} shape={<CustomBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SurveyBarChart;

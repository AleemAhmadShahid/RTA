import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Label } from "recharts";
import { validateNumeric } from "../global/validators";

const CardContainer = styled.div`

  background-color: var(--secondary-color);
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 15px;
  justify-content: space-between; 
  margin-bottom: 10px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const CardInfo = styled.div`
// background:black;
//  flex:2;
//  padding-right: 20px; 
  .info-title {
    color: grey;
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: bold;
  }

  .info-value {
    color: var(--xl-text-color);
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 8px;
  }

  .info-text {
    color: grey;
    margin-bottom: 0;
    font-weight: 500;
  }
`;

const CardChart = styled.div`
// background:black;
  width: 100px;
  height: 100px;
  
  
`;



const AreaCard = ({ colors, percentFillValue, cardInfo,width=120,height=120,cx="50",cy="45"}) => {
  const filledValue = (percentFillValue / 100) * 360;
  const remainedValue = 360 - filledValue;

  const data = [
    { name: "Remained", value: remainedValue },
    { name: "Achieved Sales", value: filledValue },
  ];

  const renderTooltipContent = (value) => {
    return `${(value / 360) * 100} %`;
  };

  return (
   
    <CardContainer>
      <CardInfo>
        <h5 className="info-title">{cardInfo.title}</h5>
        <div className="info-value">{cardInfo.value}</div>
        <p className="info-text">{cardInfo.text}</p>
      </CardInfo>
     
      <CardChart >
        <PieChart width={width} height={height} >
          <Pie
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={36}
            fill="black"
            paddingAngle={0}
            textAnchor="middle"
            dataKey="value"
            startAngle={-270}
            endAngle={90}
            stroke="none"
            // label={renderCustomLabel}
            // labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                cornerRadius={entry.value === filledValue ? 10 : 0}
              />
            ))}
            <Label
              value={`${(
                (100 * filledValue) /
                (filledValue + remainedValue)
              ).toFixed(0)}%`}
              position="center"
              fill={colors[1]}
            />
          </Pie>
          <Tooltip formatter={renderTooltipContent} />
        </PieChart>
        
      </CardChart>
      
    </CardContainer>
   
  );
};

AreaCard.propTypes = {
  colors: PropTypes.array.isRequired,
  percentFillValue: PropTypes.number.isRequired,
  cardInfo: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default AreaCard;

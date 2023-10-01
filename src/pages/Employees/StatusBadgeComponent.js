import React from 'react';

function StatusBadgeComponent({ status }) {
  // Define the colors for different status types
  const statusColors = {
    Active: 'green',
    Inactive: 'red',
    Pending: 'yellow',
    // Add more status-color mappings as needed
  };

  // Get the color for the given status
  const badgeColor = statusColors[status] || 'gray';

  return (
    <span
      style={{
        backgroundColor: badgeColor,
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadgeComponent;

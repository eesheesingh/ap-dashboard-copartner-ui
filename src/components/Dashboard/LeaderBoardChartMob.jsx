import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LeaderBoardAnalysisChart = ({ activeButton }) => {
  // Dummy data for leader board analysis
  const totalVisitData = [
    { name: 'Today', totalVisit: 100, paidUsers: 50, usersLeft: 10 },
    { name: 'Week', totalVisit: 500, paidUsers: 300, usersLeft: 50 },
    { name: 'Month', totalVisit: 1500, paidUsers: 1200, usersLeft: 200 },
  ];

  // Function to select data based on active button
  const selectData = () => {
    switch (activeButton) {
      case 'today':
        return totalVisitData.slice(0, 1);
      case 'weekly':
        return totalVisitData.slice(0, 2);
      case 'monthly':
        return totalVisitData;
      default:
        return [];
    }
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#2b2d42', borderRadius: '30px', paddingRight:'20px'}}>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={selectData()}
          margin={{ top: 20, }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#3a3e5c" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip wrapperStyle={{ backgroundColor: '#3a3e5c', border: 'none', borderRadius: '5px', padding: '5px' }} />
          <Bar dataKey="totalVisit" fill="#247673" name="Total Visit" />
          <Bar dataKey="paidUsers" fill="#25A2DE" name="Paid Users" />
          <Bar dataKey="usersLeft" fill="#D0667A" name="Not Interested (Left)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeaderBoardAnalysisChart;

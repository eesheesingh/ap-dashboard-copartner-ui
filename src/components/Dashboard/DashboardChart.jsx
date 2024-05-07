import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardChart = ({ activeButton }) => {
  // Dummy data for users joining the Telegram channel
  const todayData = [
    { name: 'Today 1', users: 10, earnings: 100 },
    
    
  ];
  
  const weeklyData = [
    { name: 'Week 1', users: 50, earnings: 500 },
    { name: 'Week 2', users: 70, earnings: 700 },
    { name: 'Week 3', users: 60, earnings: 600 },
    { name: 'Week 4', users: 80, earnings: 800 },
    { name: 'Week 5', users: 65, earnings: 650 },
  ];
  
  const monthlyData = [
    { name: 'Jan', users: 200, earnings: 2000 },
    { name: 'Feb', users: 250, earnings: 2500 },
    { name: 'Mar', users: 300, earnings: 3000 },
    { name: 'Apr', users: 280, earnings: 2800 },
    { name: 'May', users: 320, earnings: 3200 },
    { name: 'Jun', users: 350, earnings: 3500 },
  ];
  

  // Function to select data based on active button
  const selectData = () => {
    switch (activeButton) {
      case 'today':
        return todayData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return [];
    }
  };

  return (
    <div style={{ width: '100%', height: '400px', backgroundColor: '#2b2d42', borderRadius: '30px', padding: '15px' }}>
      <ResponsiveContainer>
        <LineChart
          data={selectData()}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#3a3e5c" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip wrapperStyle={{ backgroundColor: '#3a3e5c', border: 'none', borderRadius: '5px', padding: '5px' }} />
          <Legend wrapperStyle={{ color: '#fff' }} />
          <Line type="bump" dataKey="earnings" stroke="#64dfdf" strokeWidth={4} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;

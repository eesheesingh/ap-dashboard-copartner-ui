import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { parseISO, getDay, getMonth, format, isWithinInterval } from 'date-fns';

const LeaderBoardAnalysisChart = ({ activeButton, customStartDate, customEndDate, onDataUpdate }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://copartners.in:5133/api/APDashboard/GetDashboardAPListingData/705716b5-a1e8-411a-5e97-08dc770b4aef?page=1&pageSize=10'
        );

        if (response.data.isSuccess) {
          const apiData = response.data.data;

          // Group data by day of the week and month
          const dailyData = [];
          const weeklyData = Array(7).fill().map((_, index) => ({
            name: format(new Date(2024, 0, 1 + index), 'EEEE'), // Generate day names starting from Monday
            totalVisit: 0,
            paidUsers: 0,
            usersLeft: 0,
          }));
          const monthlyData = Array(12).fill().map((_, index) => ({
            name: format(new Date(2024, index, 1), 'MMMM'), // Generate month names
            totalVisit: 0,
            paidUsers: 0,
            usersLeft: 0,
          }));

          apiData.forEach((item) => {
            const date = parseISO(item.date);
            const dayOfWeek = getDay(date);
            const month = getMonth(date);
            const dayLabel = format(date, 'yyyy-MM-dd');

            const totalVisit = 1;
            const paidUser = item.subscription !== '0' ? 1 : 0;
            const notInterested = totalVisit - paidUser;

            // Daily data
            if (!dailyData[dayLabel]) {
              dailyData[dayLabel] = { name: dayLabel, totalVisit: 0, paidUsers: 0, usersLeft: 0 };
            }
            dailyData[dayLabel].totalVisit += totalVisit;
            dailyData[dayLabel].paidUsers += paidUser;
            dailyData[dayLabel].usersLeft += notInterested;

            // Weekly data
            weeklyData[dayOfWeek].totalVisit += totalVisit;
            weeklyData[dayOfWeek].paidUsers += paidUser;
            weeklyData[dayOfWeek].usersLeft += notInterested;

            // Monthly data
            monthlyData[month].totalVisit += totalVisit;
            monthlyData[month].paidUsers += paidUser;
            monthlyData[month].usersLeft += notInterested;
          });

          setData({
            daily: Object.values(dailyData),
            weekly: weeklyData,
            monthly: monthlyData,
          });
        } else {
          setError(response.data.displayMessage);
        }
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const selectedData = selectData();
    const totalVisits = selectedData.reduce((sum, item) => sum + item.totalVisit, 0);
    const paidUsers = selectedData.reduce((sum, item) => sum + item.paidUsers, 0);
    const notInterested = selectedData.reduce((sum, item) => sum + item.usersLeft, 0);
    onDataUpdate({ totalVisits, paidUsers, notInterested });
  }, [data, activeButton, customStartDate, customEndDate]);

  const selectData = () => {
    switch (activeButton) {
      case 'today':
        return data.daily?.slice(-1) || [];
      case 'weekly':
        return data.weekly || [];
      case 'monthly':
        return data.monthly || [];
      case 'custom':
        if (customStartDate && customEndDate) {
          return data.daily?.filter(d => isWithinInterval(new Date(d.name), { start: customStartDate, end: customEndDate })) || [];
        }
        return [];
      default:
        return [];
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip rounded-[10px] p-2 bg-gradient border border-[#ffffff31]">
          {payload.map((entry, index) => (
            <p key={`tooltip-${index}`} style={{ color: entry.color }}>
              {`${entry.name} : ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ width: '100%', height: '400px', backgroundColor: '#2b2d42', borderRadius: '30px', padding: '15px' }}>
      {error && <div className="text-red-500">{error}</div>}
      <ResponsiveContainer>
        <BarChart
          data={selectData()}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#3a3e5c" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: '#fff' }} />
          <Bar dataKey="totalVisit" fill="#247673" name="Total Visit" />
          <Bar dataKey="paidUsers" fill="#25A2DE" name="Paid Users" />
          <Bar dataKey="usersLeft" fill="#D0667A" name="Not Interested (Left)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeaderBoardAnalysisChart;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { parseISO, getDay, getMonth, format, isWithinInterval } from 'date-fns';

const WalletChartMob = ({ activeButton, customStartDate, customEndDate }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedStackIdData = localStorage.getItem("stackIdData");
        if (storedStackIdData) {
          const stackIdData = JSON.parse(storedStackIdData);
          const affiliateId = stackIdData.id;

          const response = await axios.get(
            `https://copartners.in:5133/api/APDashboard/GetDashboardAPListingData/${affiliateId}?page=1&pageSize=10`
          );

          if (response.data.isSuccess) {
            const apiData = response.data.data;

            // Group data by day of the week and month
            const dailyData = [];
            const weeklyData = Array(7).fill().map((_, index) => ({
              name: format(new Date(2024, 0, 1 + index), 'EEEE'), // Generate day names starting from Monday
              earnings: 0,
            }));
            const monthlyData = Array(12).fill().map((_, index) => ({
              name: format(new Date(2024, index, 1), 'MMMM'), // Generate month names
              earnings: 0,
            }));

            apiData.forEach((item) => {
              const date = parseISO(item.userJoiningDate);
              const dayOfWeek = getDay(date);
              const month = getMonth(date);
              const dayLabel = format(date, 'yyyy-MM-dd');

              const earnings = item.amount || 0;

              // Daily data
              if (!dailyData[dayLabel]) {
                dailyData[dayLabel] = { name: dayLabel, earnings: 0 };
              }
              dailyData[dayLabel].earnings += earnings;

              // Weekly data
              weeklyData[dayOfWeek].earnings += earnings;

              // Monthly data
              monthlyData[month].earnings += earnings;
            });

            setData({
              daily: Object.values(dailyData),
              weekly: weeklyData,
              monthly: monthlyData,
            });
          } else {
            setError(response.data.displayMessage);
          }
        }
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

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
    <div style={{ width: '100%', backgroundColor: '#2b2d42', borderRadius: '30px', padding: "8px" }}>
      {error && <div className="text-red-500">{error}</div>}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={selectData()}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff"/>
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ backgroundColor: '#3a3e5c', border: 'none', borderRadius: '5px', padding: '5px' }} />
          <Line type="monotone" dataKey="earnings" stroke="#64dfdf" strokeWidth={4} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WalletChartMob;

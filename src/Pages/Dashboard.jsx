import React, { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts'; 
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { activityGet, allUserGet } from '../servives/StaffServices';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { activityPostLogs } from '../utils/ActivityLogs';
import { Select } from 'antd';

dayjs.extend(relativeTime);

const UserActivityDashboard = () => {
  const [data, setData] = useState({});
  const [userdata, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const permission = useSelector((state) => state?.permission?.data);
const interValRef=useRef()
 const fetchData = async (id) => {
      const userIdValue =id|| permission?.id;
      const res = await activityGet(userIdValue);
      setData(res.data);
      setLoading(false);
    };
 const fetchUserData = async (id) => {
      
      const res = await allUserGet();
      setUserData(res?.data);
      setLoading(false);
    };
  useEffect(() => {
  
      fetchData();
     if( permission.role=="admin"){

         fetchUserData()
     }
    interValRef.current=setTimeout(() => {
          activityPostLogs("DashboardPage_Landed")
       }, 3000);
    
      
  
     return()=> clearInterval(interValRef.current)
  }, [userId]);

  if (loading) return <div className="animate-pulse text-center text-lg"><Loader /></div>;

  const { sessions, pageTime, actionCounts, timeline } =  data;

  const sessionChart = {
    tooltip: { trigger: 'item' },
    series: [
      {
        name: 'Sessions',
        type: 'pie',
        radius: ['45%', '70%'],
        roseType: 'area',
        label: {
          show: true,
          formatter: '{b}: {c}s',
          fontSize: 12,
        },
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2,
        },
        data: sessions?.map((s, i) => ({
          name: `Session ${i + 1}`,
          value: s.duration_seconds,
        })),
      },
    ],
  };

  const pageTimeChart = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  xAxis: {
    type: 'category',
    data: Object.keys(pageTime||{}),
    axisLabel: { fontSize: 12 },
    axisLine: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    splitLine: { show: false }
  },
  series: [
    {
      data: Object.values(pageTime||{}),
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#34D399' },
          { offset: 1, color: '#10B981' },
        ]),
        borderRadius: 4,
      },
      barCategoryGap: '40%',
      barMinHeight: 10,
    },
  ],
};


  const actionChart = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: Object.keys(actionCounts||{}),
      axisLabel: { rotate: 20, fontSize: 12 },
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: Object.values(actionCounts||{}),
        type: 'bar',
        itemStyle: {
          color: '#6366F1',
          shadowBlur: 10,
          shadowColor: '#888',
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
  };

  return (
    <div>
        {permission?.role=="admin"&&<div className="mb-4">
  <label htmlFor="userSelect" className="block text-xl font-bold text-blue-400 mb-1">
    Select User
  </label>
  <Select
    id="userSelect"
    value={userId || undefined}
    onChange={(value) => fetchData(value)}
    style={{ width: 300 }}
    placeholder="-- Current User --"
    showSearch
    optionFilterProp="children"
    filterOption={(input, option) =>
      (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
    }
  >
    {userdata?.map((user) => (
      <Option key={user.id} value={user.id}>
        {user.name}
      </Option>
    ))}
  </Select>
</div>}
        

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="bg-white shadow-xl rounded-xl p-4">
        <h2 className="text-2xl text-blue-500 font-bold text-center mb-4"> Session Durations</h2>
        <ReactECharts option={sessionChart} style={{ height: 340 }} />
      </div>

      <div className="bg-white shadow-xl rounded-xl p-4">
        <h2 className="text-2xl text-blue-500 font-bold text-center mb-4 ">Page Time Tracking</h2>
        <ReactECharts option={pageTimeChart} style={{ height: 340 }} />
      </div>

      <div className="bg-white shadow-xl rounded-xl p-4 md:col-span-2">
        <h2 className="text-2xl text-blue-500 font-bold text-center mb-4">Action Frequency</h2>
        <ReactECharts option={actionChart} style={{ height: 340 }} />
      </div>

      <div className="bg-white shadow-xl rounded-xl p-4 md:col-span-2">
        <h2 className="text-2xl text-blue-500 font-bold mb-4 ">Activity Timeline</h2>
        <div className="max-h-[300px] overflow-y-auto text-sm space-y-4">
          {timeline?.map((item, index) => (
            <div key={index} className="border-l-4 border-indigo-500 pl-4 pb-3 relative">
              <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-[6px]" />
              <div className="text-sm text-gray-700"><strong>Action:</strong> {item.action}</div>
              <div className="text-xs text-gray-500">{dayjs(item.timestamp).format('YYYY-MM-DD HH:mm:ss')} ({dayjs(item.timestamp).fromNow()})</div>
              <div className="text-xs text-gray-500"><strong>IP:</strong> {item.ip_address}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserActivityDashboard;

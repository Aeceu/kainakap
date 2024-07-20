import axios from "../../redux/api";
import { useEffect, useState } from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type TData = {
  name: string;
  count: number;
  length: number;
};

const AdminUserChart = () => {
  const [data, setData] = useState<TData[]>([
    {
      name: "Admin",
      count: 0,
      length: 0,
    },
    {
      name: "User",
      count: 0,
      length: 0,
    },
  ]);
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get("/users");
        setData([
          {
            ...data[0],
            count: res.data.admins,
            length: res.data.admins + 5,
          },
          {
            ...data[1],
            count: res.data.users,
            length: res.data.users + 5,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCount();
  }, []);

  console.log(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        {/* <CartesianGrid strokeDasharray="1 1" /> */}
        <XAxis dataKey="name" />
        <YAxis dataKey="length" />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default AdminUserChart;

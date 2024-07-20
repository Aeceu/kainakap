import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const VerifiedAndNoneVerified = () => {
  const data = [
    {
      name: "Verified",
      count: 2,
      length: 0,
    },
    {
      name: "Non-Verified",
      count: 3,
      length: 0,
    },
  ];

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
export default VerifiedAndNoneVerified;

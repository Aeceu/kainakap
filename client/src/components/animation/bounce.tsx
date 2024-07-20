import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};
const Bounce: React.FC<Props> = ({ children, delay }) => {
  return (
    <motion.div
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      transition={{ delay, duration: 0.5, type: "spring", bounce: 0.5 }}>
      {children}
    </motion.div>
  );
};
export default Bounce;

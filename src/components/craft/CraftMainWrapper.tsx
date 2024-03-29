import cx from "classnames";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { Variants } from "framer-motion";

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -100,
  },
};

interface CraftWrapperProps {
  className?: string;
}

export default function CraftMainWrapper({
  className,
  children,
}: PropsWithChildren<CraftWrapperProps>): JSX.Element {
  return (
    <motion.main
      className={cx(
        className,
        "container flex min-h-screen flex-col items-center gap-8 overflow-x-hidden py-32 md:max-w-5xl 2xl:max-w-6xl"
      )}
      variants={pageVariants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ transition: { ease: "circInOut", duration: 0.2 } }}
    >
      {children}
    </motion.main>
  );
}

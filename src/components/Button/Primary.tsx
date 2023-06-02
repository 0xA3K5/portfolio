import cx from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { hexToRGB } from "../../utils/hexToRGB";
import Link from "next/link";

import { motion, MotionConfig, Variants } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

interface PrimaryProps {
  className?: string;
  text: string;
  icon: ReactNode;
  href: string;
}

export default function Primary({
  className,
  text,
  icon,
  href,
}: PrimaryProps): JSX.Element {
  const [hover, setHover] = useState(false);
  const [textRgb, setTextRgb] = useState("");
  const { theme, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  useEffect(() => {
    if (theme === "dark") {
      setTextRgb(hexToRGB("ffffff"));
    } else if (theme === "light") {
      setTextRgb(hexToRGB("06060B"));
    } else if (theme === "dim") {
      setTextRgb(hexToRGB("ffffff"));
    }
  }, [theme]);

  const buttonIcon: Variants = {
    idle: {
      x: 0,
      y: 0,
    },
    hover: {
      x: [0, 25, -25, 0],
      y: [0, -25, 25, 0],
      opacity: [100, 0, 0, 100],
      scale: 1.1,
      transition: {
        type: "spring",
        duration: 1,
        repeatDelay: 0.15,
        repeat: Infinity,
      },
    },
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel=""
      passHref
      scroll={false}
      className="w-full"
    >
      <MotionConfig
        transition={{
          staggerChildren: 0.2,
          delayChildren: 0.2,
          staggerDirection: 1,
          duration: 0.4,
          ease: [0.85, 0, 0.3, 1],
        }}
      >
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            backgroundColor: hover ? `rgba(${textRgb})` : `rgba(${textRgb},.1)`,
          }}
          className={cx(
            "group flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl py-4 px-6 duration-50 sm:w-fit",
            themeClasses.color,
            themeClasses.textHover,
            className
          )}
        >
          <span className="whitespace-nowrap duration-150 group-hover:-translate-x-2">
            {text}
          </span>
          <motion.span variants={buttonIcon} animate={hover ? "hover" : "idle"}>
            {icon}
          </motion.span>
        </div>
      </MotionConfig>
    </Link>
  );
}

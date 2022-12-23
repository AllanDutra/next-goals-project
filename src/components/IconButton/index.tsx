import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { IconContext } from "phosphor-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./styles.module.scss";

interface FloatingProps {
  children: ReactNode;
}

interface LinkProps extends NextLinkProps {
  children: ReactNode;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: "small" | "default";
}

function Floating({ children }: FloatingProps) {
  return <div className={styles.floating}>{children}</div>;
}

function Link({ children, ...rest }: LinkProps) {
  return <NextLink {...rest}>{children}</NextLink>;
}

function Button({ icon, size = "default", ...rest }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        size === "small" ? styles["small-button"] : ""
      }`}
      {...rest}
    >
      <IconContext.Provider
        value={{
          weight: "bold",
        }}
      >
        {icon}
      </IconContext.Provider>
    </button>
  );
}

export const IconButton = { Floating, Link, Button };

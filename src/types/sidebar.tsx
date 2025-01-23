import { ReactNode } from "react";

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};

export type TLink =
  | {
      key: string;
      label: ReactNode;
      children?: TLink[];
    }
  | undefined;

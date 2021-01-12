import { createContext } from "react";

type ExternalUrls = {
  spotify: string;
};

type Followers = {
  href?: any;
  total: number;
};

type Image = {
  height?: any;
  url: string;
  width?: any;
};

type User = {
  display_name: string;
  email: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
};

export type AuthContext = undefined | User;
export const AuthContext = createContext<AuthContext>(undefined);

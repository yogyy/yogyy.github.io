import { Mail, Github, Linkedin, Twitter } from "lucide-react";
interface LinkProps {
  href: string;
  alt: string;
  icon: any;
}
export const links: LinkProps[] = [
  { href: "mailto:m.yogi.fs@gmail.com", alt: "Email", icon: Mail },
  {
    href: "https://github.com/yogyy",
    alt: "Github",
    icon: Github,
  },

  {
    href: "https://www.linkedin.com/in/yogyy/",
    alt: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://twitter.com/yogyyconst",
    alt: "Twitter",
    icon: Twitter,
  },
];

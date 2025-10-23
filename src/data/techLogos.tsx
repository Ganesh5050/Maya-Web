import { LogoItem } from '../components/LogoLoop';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiVercel,
  SiSvelte,
  SiNodedotjs,
  SiAstro,
  SiGithub,
  SiDocker
} from 'react-icons/si';

// Technology logos data using react-icons
export const techLogos: LogoItem[] = [
  {
    node: <SiVercel className="w-8 h-8 text-white" />,
    title: "Vercel",
    href: "https://vercel.com"
  },
  {
    node: <SiNextdotjs className="w-8 h-8 text-white" />,
    title: "Next.js",
    href: "https://nextjs.org"
  },
  {
    node: <SiSvelte className="w-8 h-8 text-white" />,
    title: "Svelte",
    href: "https://svelte.dev"
  },
  {
    node: <SiReact className="w-8 h-8 text-white" />,
    title: "React",
    href: "https://reactjs.org"
  },
  {
    node: <SiNodedotjs className="w-8 h-8 text-white" />,
    title: "Node.js",
    href: "https://nodejs.org"
  },
  {
    node: <SiTypescript className="w-8 h-8 text-white" />,
    title: "TypeScript",
    href: "https://typescriptlang.org"
  },
  {
    node: <SiTailwindcss className="w-8 h-8 text-white" />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com"
  },
  {
    node: <SiAstro className="w-8 h-8 text-white" />,
    title: "Astro",
    href: "https://astro.build"
  },
  {
    node: <SiGithub className="w-8 h-8 text-white" />,
    title: "GitHub",
    href: "https://github.com"
  },
  {
    node: <SiDocker className="w-8 h-8 text-white" />,
    title: "Docker",
    href: "https://docker.com"
  }
];


import { Project, Exhibition, Stat } from './types';

export const COLORS = {
  background: '#F5F3EE',
  text: '#0E0E0E',
  accent: '#F4B63A',
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Intuitive Interfaces',
    category: 'UI/UX Design',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
  },
  {
    id: '2',
    title: 'Graphic Designing',
    category: 'Visual Arts',
    imageUrl: 'https://i.ibb.co/TqPJhBt4/istockphoto-1191609321-612x612.jpg',
    year: '2024',
  },
  {
    id: '3',
    title: 'Logo Designing',
    category: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
    year: '2024',
  },
  {
    id: '4',
    title: 'Website Designing',
    category: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200',
    year: '2023',
  },
];

export const EXPERIENCE = [
  {
    id: 'exp3',
    title: 'Freelance Developer & UI/UX Designer',
    company: 'Freelancer.com',
    location: 'Remote',
    date: 'Jul 2025 - Jan 2026',
    description: 'Designed and developed responsive websites, ensuring optimal user experience across devices. Collaborated on both front-end and back-end development, enhancing functionality and performance. Created intuitive web UI/UX designs that improved user engagement and satisfaction.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'exp2',
    title: 'Freelance Designer & Writer',
    company: 'Fiverr',
    location: 'Remote',
    date: 'Sept 2023 - Dec 2023',
    description: 'Logo design, content writing, and graphic design for global clients.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'exp1',
    title: 'User Interface Designer',
    company: 'Upwork',
    location: 'Remote',
    date: 'June 2023 - Dec 2023',
    description: 'Designing intuitive, user-centered interfaces for web and mobile applications.',
    imageUrl: 'https://i.ibb.co/HTYhfDgc/stock-photo-holographic-ui-ux-display-icons-of-ux-ui-designer-creative-planning-data-visualization-w.jpg'
  }
];

export const SKILLS = [
  'Web Development', 'Editing', 'Graphic Design', 'User Experience Design (UED)', 'WordPress Design', 'Web Design', 'Logo Design', 'Data Entry', 'Search Engine Optimization (SEO)'
];

export const STATS: Stat[] = [];

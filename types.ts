
export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
}

export interface Exhibition {
  id: string;
  title: string;
  location: string;
  date: string;
  link?: string;
}

export interface Stat {
  label: string;
  value: string;
  description: string;
}

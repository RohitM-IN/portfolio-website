
export interface Stat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  role: string;
  shortRole: string;
  bio: string;
  about: string[];
  avatar: string;
  stats: Stat[];
  openToWork?: boolean;
}

export interface Competency {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Role {
  title: string;
  period: string;
  description: string;
}

export interface Experience {
  company: string;
  website: string;
  logoText: string;
  color: string;
  employmentType?: string;
  roles: Role[];
}

export interface TechItem {
  name: string;
  iconUrl?: string;
  icon?: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  logoText: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  hidden?: boolean;
}

export interface Social {
  name: string;
  icon?: string;
  svgIcon?: string;
  link: string;
}

export interface PortfolioData {
  profile: Profile;
  competencies: Competency[];
  experience: Experience[];
  techStack: TechItem[];
  education: Education[];
  projects: Project[];
  socials: Social[];
}

import React from 'react';
import Image from 'next/image';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  domain: string;
  avatar: string;
  accentColor: string;
  bio: string;
  skills: string[];
  github: string;
  linkedin: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-01',
    name: 'Aarav Chandran',
    role: 'Lead Organizer & Systems Architect',
    domain: 'Chapter Leadership',
    avatar: '/assets/avatars/member-01.svg',
    accentColor: '#4285F4',
    bio: 'Undergraduate Computer Science researcher focusing on distributed consensus and high-throughput microservices.',
    skills: ['Go', 'Kubernetes', 'GCP', 'Distributed Systems'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-02',
    name: 'Priyanka Sundaram',
    role: 'AI / ML Track Lead',
    domain: 'Machine Intelligence',
    avatar: '/assets/avatars/member-02.svg',
    accentColor: '#EA4335',
    bio: 'Passionate about multimodal model fine-tuning, retrieval-augmented architectures, and Gemini API integrations.',
    skills: ['PyTorch', 'Gemini API', 'JAX', 'Vector Databases'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-03',
    name: 'Rohan Deshmukh',
    role: 'Cloud & Infrastructure Lead',
    domain: 'DevOps & Cloud',
    avatar: '/assets/avatars/member-03.svg',
    accentColor: '#FBBC04',
    bio: 'Architecting self-healing Kubernetes clusters and automating zero-trust security postures across Google Cloud.',
    skills: ['Terraform', 'GKE', 'Docker', 'Linux Internals'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-04',
    name: 'Ananya Nambiar',
    role: 'Mobile & Kotlin Lead',
    domain: 'Android Systems',
    avatar: '/assets/avatars/member-04.svg',
    accentColor: '#34A853',
    bio: 'Crafting fluid declarative applications in Jetpack Compose, emphasizing state machine predictability and offline-first caches.',
    skills: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Material 3'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-05',
    name: 'Vikramaditya Hegde',
    role: 'Frontend & UI Performance Lead',
    domain: 'Web Engineering',
    avatar: '/assets/avatars/member-05.svg',
    accentColor: '#4285F4',
    bio: 'Obsessed with sub-second paint times, WCAG AAA accessibility, custom shader pipelines, and Next.js Turbopack workflows.',
    skills: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-06',
    name: 'Sneha Kulkarni',
    role: 'Open Source Community Lead',
    domain: 'Community & DevRel',
    avatar: '/assets/avatars/member-06.svg',
    accentColor: '#EA4335',
    bio: 'Championing student open-source contributions, leading documentation sprints, and organizing inclusive student hackathons.',
    skills: ['Git Workflows', 'CI/CD Actions', 'Community Building', 'Technical Writing'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-07',
    name: 'Aditya Bhattacharya',
    role: 'Design Systems Architect',
    domain: 'Product & Design',
    avatar: '/assets/avatars/member-07.svg',
    accentColor: '#34A853',
    bio: 'Engineering multi-theme design token engines, generative SVG tools, and component specifications with pixel-perfect craft.',
    skills: ['Figma Tokens', 'SVG Engineering', 'Design Tokens', 'Interaction Design'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-08',
    name: 'Kavya Srinivasan',
    role: 'Data & Security Lead',
    domain: 'Data Engineering',
    avatar: '/assets/avatars/member-08.svg',
    accentColor: '#FBBC04',
    bio: 'Researching privacy-preserving machine learning, streaming BigQuery pipelines, and secure API gateways.',
    skills: ['BigQuery', 'Apache Beam', 'PostgreSQL', 'Cryptography'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-09',
    name: 'Nikhil Ranganathan',
    role: 'Hackathon Operations Lead',
    domain: 'Technical Operations',
    avatar: '/assets/avatars/member-09.svg',
    accentColor: '#4285F4',
    bio: 'Running high-throughput judging matrices, hardware lab stations, and live-streaming technical masterclasses.',
    skills: ['Event Operations', 'API Prototyping', 'Hardware Labs', 'Python'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-10',
    name: 'Meera Venkat',
    role: 'Developer Relations Specialist',
    domain: 'Student Outreaches',
    avatar: '/assets/avatars/member-10.svg',
    accentColor: '#EA4335',
    bio: 'Facilitating student-faculty tech alliances, coordinating study jams, and curating developer retrospectives.',
    skills: ['Tech Evangelism', 'Mentorship', 'Public Speaking', 'Workshop Curation'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
];

export default function TeamPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-xs font-['JetBrains_Mono',monospace] text-[var(--text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-[#34A853]" />
            <span>GDG RVCE CORE TEAM 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-['Space_Grotesk',sans-serif] font-bold text-[var(--text-primary)] tracking-tight">
            The Student Engineering Collective
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Passionate student developers, systems researchers, and community builders leading workshops, hackathons, and open-source initiatives at RV College of Engineering.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Avatar & Social Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden relative border border-[var(--border-hairline)] bg-[#0F172A] shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all"
                      aria-label={`${member.name} GitHub`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[#4285F4] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Member Names & Role */}
                <div className="space-y-1">
                  <div
                    className="text-[11px] font-['JetBrains_Mono',monospace] font-semibold uppercase tracking-wider"
                    style={{ color: member.accentColor }}
                  >
                    {member.domain}
                  </div>
                  <h2 className="text-xl font-['Space_Grotesk',sans-serif] font-bold text-[var(--text-primary)]">
                    {member.name}
                  </h2>
                  <p className="text-xs font-medium text-[var(--text-secondary)]">
                    {member.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Skills Tag Pills */}
              <div className="pt-6 mt-6 border-t border-[var(--border-hairline)] flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono',monospace] bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-hairline)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { HomeContent, ContactSettings } from './types';

// The current, approved home-page copy — ported verbatim. Used to seed the
// database and as a render-time fallback so the site works before Supabase is
// connected. Image refs are static /assets paths until the client swaps them.

export const DEFAULT_HOME: HomeContent = {
  hero: {
    eyebrow: 'Coral Gables · Established 1986',
    heading: 'Turning raw ideas into <em>comfortable, livable, inspired</em> buildings.',
    lede: 'United Architects is a Miami practice designing resilient, secure, and beautifully resolved spaces — for the homes we live in, the schools we learn in, and the places a community gathers.',
    image: '/assets/hero.jpg',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'View our work',
    meta: [
      { label: 'Miami Herald Gold Medal', sub: 'Best Architecture Firm — 2025 Reader Favorites' },
      { label: 'Featured on HGTV', sub: 'Two residential projects' },
    ],
  },
  trust: {
    label: 'Trusted across Miami-Dade',
    items: ['Miami-Dade County Public Schools', 'Miami-Dade County', "Women's Chamber of Commerce", 'LEED Accredited'],
  },
  values: {
    heading: 'Your project deserves architecture that lasts.',
    intro: 'For nearly four decades we have translated ambition into buildings that are code-sound, well-coordinated, and a genuine pleasure to live and work in.',
    items: [
      { title: 'A hands-on principal', body: 'The architect who wins your trust is the one who stays with your project — involved through every phase of design and construction.' },
      { title: 'Code & coordination mastery', body: 'Deep fluency in Florida Building Code, ADA, and every Miami-Dade zoning overlay — so plans clear review and change orders stay rare.' },
      { title: 'Local roots, wide reach', body: 'Thirty years of Miami practice, with projects delivered internationally across Saudi Arabia, Fiji, and Costa Rica.' },
    ],
  },
  statement: 'Architecture, <em>drawing by drawing,</em> detail by detail — until an idea becomes a place.',
  work: {
    eyebrow: 'Selected work',
    heading: 'A portfolio built across the region.',
    intro: 'From single-family homes to shopping centers and schools, each project carries the same commitment to livability, code, and craft.',
    projects: [
      { type: 'Residential', title: 'Custom Single-Family Residence', location: 'Coral Gables, FL', tag: 'New build', image: '/assets/project-01.jpg', tall: true },
      { type: 'Institutional', title: 'Educational Facility', location: 'Miami-Dade County Public Schools', tag: 'Public', image: '/assets/project-02.jpg' },
      { type: 'Multi-family', title: 'Residential Building', location: 'Miami, FL', tag: 'Mixed', image: '/assets/project-03.jpg' },
      { type: 'Commercial', title: 'Neighborhood Shopping Center', location: 'Miami-Dade County, FL', tag: 'Retail', image: '/assets/project-04.jpg', wide: true },
    ],
  },
  services: {
    eyebrow: 'What we do',
    heading: 'Six areas of expertise.',
    intro: 'One studio, whether you are building a first home or expanding a commercial property — with the coordination each demands.',
    items: [
      { title: 'Single-Family Residential', body: 'New custom homes and thoughtful reimaginings of the residence you already have.' },
      { title: 'Multi-Family Residential', body: 'Comfortable, efficient homes that make the most of every unit and every site.' },
      { title: 'Educational Buildings', body: 'Learning environments delivered to public school district standards.' },
      { title: 'Shopping Centers', body: 'Retail and commercial architecture designed to draw a community in.' },
      { title: 'Additions & Remodeling — Residences', body: 'Extensions and restorations that respect the home you already love.' },
      { title: 'Additions & Remodeling — Buildings', body: 'Commercial expansions coordinated for code, ADA, and construction type.' },
    ],
  },
  method: {
    eyebrow: 'Our method',
    heading: 'The 10-Point Project Management Checklist.',
    intro: 'Projects are too often derailed by inadequate coordination. Our checklist curtails errors in the plans and reduces change orders in the field — so your project arrives on budget and on record.',
    checklist: [
      { title: 'Zoning Verification', body: 'Confirmed at least twice in preliminary design — by phone and in person at the municipality.' },
      { title: 'Utilities Coordination', body: 'The MEP engineer locates water and sewer connections before we commit the plan.' },
      { title: 'ADA & Code Compliance', body: 'Commercial work is checked against ADA, UFAS, or Fair Housing as the code requires.' },
      { title: 'Construction Type Documentation', body: 'Drawings state construction type, stories, and occupancy per the Florida Building Code.' },
    ],
    more: 'Plus six further checkpoints spanning survey, structural, MEP, life-safety, permitting, and closeout — reviewed on every project.',
  },
  firm: {
    eyebrow: 'The firm',
    heading: 'Three decades of hands-on architecture.',
    portrait: '/assets/portrait.svg',
    paragraphs: [
      'United Architects is led by owner and president <strong>Maria Luisa Castellanos, R.A., LEED AP</strong> — with more than thirty years of industry experience. Before founding the firm in 1986, she led projects across Miami and internationally in Saudi Arabia, Fiji, and Costa Rica.',
      'A member of the Women’s Chamber of Commerce of Miami-Dade County and an adjunct professor of architecture at Miami Dade College, she stays involved — hands-on — through every phase of design and construction.',
    ],
    stats: [
      { value: '1986', label: 'Founded in Miami' },
      { value: '30+', label: 'Years of practice' },
      { value: '2×', label: 'Featured on HGTV' },
      { value: '2025', label: 'Miami Herald Gold Medal' },
    ],
  },
  contact: {
    eyebrow: 'Start a project',
    heading: "Let's design something built to last.",
    intro: "Tell us about your site and your ambitions. We'll bring the drawings, the coordination, and thirty years of Miami experience.",
  },
};

export const DEFAULT_CONTACT: ContactSettings = {
  address: '4000 Ponce de Leon Blvd., Suite 470<br/>Coral Gables, FL 33146',
  phone: '(305) 552-5465',
  phoneHref: '+13055525465',
  email: 'MLC@UnitedArchs.com',
  hours: 'Monday–Friday<br/>9:00–5:00 ET',
};

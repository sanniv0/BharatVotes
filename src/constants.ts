import React from 'react';
import { UserPlus, Vote, BookOpen, MapPin, CheckCircle2 } from 'lucide-react';
import { ElectionStep } from './types';

export const ELECTION_STEPS: ElectionStep[] = [
  {
    id: 'registration',
    title: 'New Registration',
    icon: React.createElement(UserPlus, { className: "w-5 h-5" }),
    description: 'Ensure you are in the Electoral Roll.',
    details: 'Use Form 6 for new registration if you are 18+. Use NVSP portal or Voter Helpline App.',
    links: [{ label: 'Register on Voter Portal', url: 'https://voters.eci.gov.in' }]
  },
  {
    id: 'id-card',
    title: 'EPIC Card',
    icon: React.createElement(Vote, { className: "w-5 h-5" }),
    description: 'The Voter Identity Card (EPIC).',
    details: 'Download your e-EPIC from the portal once your registration is approved by the ERO.',
    links: [{ label: 'Download e-EPIC', url: 'https://voters.eci.gov.in/download-epic' }]
  },
  {
    id: 'search',
    title: 'Check Name',
    icon: React.createElement(BookOpen, { className: "w-5 h-5" }),
    description: 'Verify your name in the list.',
    details: 'Always check if your name appears in the current electoral roll of your constituency before voting.',
    links: [{ label: 'Electoral Search', url: 'https://electoralsearch.eci.gov.in' }]
  },
  {
    id: 'booth',
    title: 'Find Your Booth',
    icon: React.createElement(MapPin, { className: "w-5 h-5" }),
    description: 'Locate your polling station.',
    details: 'Find your polling booth location and BLO details using your EPIC number or name.',
    links: [{ label: 'Booth Locator', url: 'https://electoralsearch.eci.gov.in/pollingstation' }]
  },
  {
    id: 'vote',
    title: 'Cast on EVM/VVPAT',
    icon: React.createElement(CheckCircle2, { className: "w-5 h-5" }),
    description: 'Visit booth and vote.',
    details: 'Verify at booth, get inked, and press the blue button on the Balloting Unit of the EVM.',
    links: [{ label: 'Voting Process Guide', url: 'https://eci.gov.in/voter/voter-guide/' }]
  }
];

export const CHAT_SUGGESTIONS = [
  "New Voter Form 6",
  "NRI Voter Info",
  "Download e-EPIC",
  "Check Voter List"
];

export const RESOURCE_LINKS = [
  { label: "Voters' Service Portal", desc: 'Registration', url: 'https://voters.eci.gov.in' },
  { label: 'Electoral Roll Search', desc: 'Verify', url: 'https://electoralsearch.eci.gov.in' },
  { label: "Voter Guide (ECI)", desc: 'Manuals', url: 'https://eci.gov.in/voter/voter-guide/' },
  { label: 'Know Your Candidate', desc: 'Research', url: 'https://affidavit.eci.gov.in' }
];

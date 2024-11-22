import { gql } from 'graphql-request';
import { Building, Home, User } from 'lucide-react';

export const USP_CARDS = [
  {
    imageUrl: '/fire.png',
    heading: 'Instantly Identify Hot Prospects',
    description:
      'Our powerful data-driven platform enables you to quickly spot businesses that are or have ran ads, allowing you to target high-potential clients with precision.',
  },
  {
    imageUrl: '/conversion.png',
    heading: 'Optimize Your Conversion Rates',
    description:
      'Leverage our comprehensive insights on website performance, mobile friendliness, and SEO metrics to optimize your cold outreach campaigns and convert more leads into loyal customers.',
  },
  {
    imageUrl: '/rocket.png',
    heading: 'Stay Ahead of the Competition',
    description:
      'Gain a competitive edge with our real-time analytics, providing you with the latest information on your prospects social media presence, site security, and overall online presence.',
  },
];

export const HIGHLIGHTS = [
  {
    imageUrl: '/discover.png',
    heading: 'Lead Discovery',
    description:
      'Uncover valuable leads effortlessly by leveraging our advanced data analytics. Identify businesses running ads, assess their online presence, and pinpoint their pain points to target precisely.',
  },
  {
    imageUrl: '/insights.png',
    heading: 'Comprehensive Insights',
    description:
      'Access crucial information about businesses, including site speed, security, mobile friendliness, and SEO metrics. Use these insights to fine-tune your strategies and offer tailored solutions.',
  },
  {
    imageUrl: '/dashboard.png',
    heading: 'Intuitive Dashboard',
    description:
      'Our user-friendly dashboard provides a centralized hub for managing leads, tracking performance metrics, and accessing in-depth reports. Gain actionable insights at a glance, allowing you to make data-driven decisions with confidence.',
  },
];

export const plans = [
  {
    name: 'Freelancer',
    id: 'P-9CA97503EW608442PM4MRTXQ',
    credits: 500,
    price: '$89',
    icon: <User />,
    features: [
      { name: '500 Credits', available: true },
      { name: 'On page SEO issues', available: true },
      { name: 'Accesibilty issues', available: true },
      { name: 'Security issues', available: false },
      { name: 'Social Media Presence', available: true },
      { name: 'Bulk Search', available: false },
    ],
  },
  {
    name: 'Agency',
    credits: 2000,
    id: 'P-6SW07264NX224922MM4MRU4Y',
    price: '$129',
    icon: <Home />,
    features: [
      { name: 'Everything in freelancer plus', available: true },
      { name: '2000 Credits', available: true },
      { name: 'Social Advertising Data', available: false },
      { name: 'Google Analytics usage', available: false },
      { name: 'Site speed', available: false },
      { name: 'Downloadabe Audit Report', available: false },
    ],
  },
  {
    name: 'Agency +',
    credits: 5000,
    id: 'P-6SW07264NX224922MM4MRU4Y',
    price: '$299',
    icon: <Building />,
    features: [
      { name: 'Everything in agency plus', available: true },
      { name: '6000 Credits', available: true },
      { name: 'Lead Generator', available: true },
      { name: 'Google Rating', available: true },
      { name: 'Google Reviwes', available: true },
      { name: 'Priority Support', available: true },
    ],
  },
];

export const QUERY = gql`
  {
    posts {
      createdAt
      id
      publishedAt
      slug
      title
      updatedAt
      createdBy {
        createdAt
        name
        picture
      }
      content {
        html
      }
      coverphoto {
        url
      }
      excerpt
    }
  }
`;

export const POST_QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      createdAt
      id
      publishedAt
      slug
      title
      updatedAt
      createdBy {
        createdAt
        name
        picture
      }
      content {
        html
      }
      coverphoto {
        url
      }
      excerpt
    }
  }
`;

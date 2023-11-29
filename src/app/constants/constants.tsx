import { gql } from 'graphql-request';

export const USP_CARDS = [
  {
    imageUrl: '/fire.png',
    heading: 'Instantly Identify Hot Prospects',
    description:
      'Our powerful data-driven platform enables you to quickly spot businesses actively running ads, allowing you to target high-potential clients with precision.',
  },
  {
    imageUrl: '/conversion.png',
    heading: 'Optimize Your Conversion Rates',
    description:
      'Leverage our comprehensive insights on website performance, mobile friendliness, and SEO metrics to optimize your marketing campaigns and convert more leads into loyal customers.',
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
    name: 'Basic',
    price: '$99.99',
    features: [
      { name: '10 Daily Searches', available: true },
      { name: 'Contact Info', available: true },
      { name: 'Website Urls', available: true },
      { name: 'Social Presence', available: true },
      { name: 'Running Ads', available: false },
      { name: 'Remarketing Pixel', available: false },
      { name: 'Analytics', available: false },
      { name: 'GMB Rankings', available: false },
      { name: 'Clickabe Contacts', available: false },
      { name: 'On Page SEO metrics', available: false },
      { name: 'Meta Data', available: false },
      { name: 'Responsiveness', available: false },
      { name: 'Security', available: false },
      { name: 'Speed', available: false },
      { name: 'Image optimizations', available: false },
      { name: 'Sitemaps', available: false },
      { name: 'Google Reviews', available: false },
      { name: 'Address', available: false },
      { name: 'Sub Accounts', available: false },
      { name: 'Bulk Search', available: false },
      { name: 'Main Category', available: false },
    ],
  },
  {
    name: 'Pro',
    price: '$149.99',
    features: [
      { name: '25 Daily Searches', available: true },
      { name: 'Contact Info', available: true },
      { name: 'Website Urls', available: true },
      { name: 'Social Presence', available: true },
      { name: 'Running Ads', available: false },
      { name: 'Remarketing Pixel', available: true },
      { name: 'Analytics', available: true },
      { name: 'GMB Rankings', available: true },
      { name: 'Clickabe Contacts', available: true },
      { name: 'On Page SEO metrics', available: true },
      { name: 'Meta Data', available: true },
      { name: 'Responsiveness', available: true },
      { name: 'Security', available: true },
      { name: 'Speed', available: true },
      { name: 'Image optimizations', available: true },
      { name: 'Sitemaps', available: true },
      { name: 'Google Reviews', available: true },
      { name: 'Address', available: true },
      { name: 'Sub Accounts', available: false },
      { name: 'Bulk Search', available: false },
      { name: 'Main Category', available: false },
    ],
  },
  {
    name: 'Premium',
    price: '$299.99',
    features: [
      { name: '90 Daily Searches', available: true },
      { name: 'Contact Info', available: true },
      { name: 'Website Urls', available: true },
      { name: 'Running Ads', available: true },
      { name: 'Remarketing Pixel', available: true },
      { name: 'Analytics', available: true },
      { name: 'GMB Rankings', available: true },
      { name: 'Social Presence', available: true },
      { name: 'Clickabe Contacts', available: true },
      { name: 'On Page SEO metrics', available: true },
      { name: 'Meta Data', available: true },
      { name: 'Responsiveness', available: true },
      { name: 'Security', available: true },
      { name: 'speed', available: true },
      { name: 'Image optimizations', available: true },
      { name: 'Sitemaps', available: true },
      { name: 'Google Reviews', available: true },
      { name: 'Address', available: true },
      { name: 'Sub Accounts', available: true },
      { name: 'Bulk Search', available: true },
      { name: 'Main Category', available: true },
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

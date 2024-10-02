export const calculateSocialPresenceScore = ({
  data,
}: {
  data: {
    google: any;
    facebook: any;
    linkedin: any;
    twitter: any;
    analytics: any;
    gtm: any;
    socialMediaLinks: {};
  };
}) => {
  let score = 0;

  score += data.google ? 5 : 0;
  score += data.facebook ? 5 : 0;
  score += data.linkedin ? 5 : 0;
  score += data.twitter ? 5 : 0;
  score += data.analytics || data.gtm ? 10 : 0;

  // Add points for social media links
  const socialLinksCount = data.socialMediaLinks
    ? Object.keys(data?.socialMediaLinks)?.length
    : 0;
  score +=
    socialLinksCount === 0
      ? 0
      : socialLinksCount === 1
      ? 20
      : socialLinksCount === 2
      ? 40
      : socialLinksCount > 2
      ? 60
      : 0; // Cap at 30

  return score; // Scale to 30
};

export const calculateSpeedOptimizationScore = ({
  data,
}: {
  data: {
    pageSpeed: number;
    imageInfo: number;
    h1Count: any;
    isResponsive: any;
    internalLinks: number;
    externalLinks: number;
  };
}) => {
  let score = 0;

  // Inverted score for page speed (e.g., below 3 seconds)
  score += data.pageSpeed < 3 ? 40 : data.pageSpeed < 6 ? 20 : 0;

  // Other optimizations
  score += data.imageInfo > 50 ? 5 : data.imageInfo > 1 ? 3 : 0; // Arbitrary threshold for images
  score += data.h1Count ? 5 : 0; // Assuming h1 is used correctly
  score += data.isResponsive ? 40 : 0;

  // Points for links
  score += Math.min(data.internalLinks * 1, 5);
  score += Math.min(data.externalLinks * 1, 5);

  return score; // Scale to 40
};

export const calculateUserExperienceScore = ({
  data,
}: {
  data: { mailtoLinks: any; telLinks: any; ssl: any; isResponsive: any };
}) => {
  let score = 0;

  score += data.mailtoLinks ? 25 : 0;
  score += data.telLinks ? 25 : 0;
  score += data.ssl ? 10 : 0;

  // Don't double count responsiveness
  score += data.isResponsive ? 40 : 0;

  // Add other metrics if needed (for example, usability features)

  return score; // Scale to 30
};

export const generateReportScores = (data: {
  google: any;
  facebook: any;
  linkedin: any;
  twitter: any;
  analytics: any;
  gtm: any;
  socialMediaLinks: [];
  pageSpeed: number;
  imageInfo: number;
  h1Count: any;
  isResponsive: any;
  internalLinks: number;
  externalLinks: number;
  mailtoLinks: any;
  telLinks: any;
  ssl: any;
}) => {
  const socialScore = calculateSocialPresenceScore({ data });
  const speedScore = calculateSpeedOptimizationScore({ data });
  const userExperienceScore = calculateUserExperienceScore({ data });

  return {
    socialScore,
    speedScore,
    userExperienceScore,
  };
};

'use client';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';

import {
  AirplayIcon,
  Facebook,
  FacebookIcon,
  GaugeCircle,
  Instagram,
  InstagramIcon,
  Linkedin,
  LinkedinIcon,
  Mail,
  Phone,
  ShieldAlert,
  ShieldCheck,
  TabletSmartphone,
  Twitter,
  TwitterIcon,
} from 'lucide-react';
import ScoreSection from './components/ScoreSection';

const Report = (dummyReport: any) => {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: '10px 0',
      fontFamily: 'Poppins, sans-serif',
      color: '#333',
      margin: '0 auto',
      marginTop: '-70px',
      marginLeft: '70px',
    },
    infoRow: {
      width: '400px',
      alignItems: 'center',
      padding: '5px 0',
    },
    item: {
      flex: 1,
      fontSize: '16px',
    },
    label: {
      fontWeight: 'bold',
      color: '#333',
    },
    link: {
      color: '#3498DB',
      textDecoration: 'none',
      wordBreak: 'break-word', // For long URLs
    },
    flex: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    card: {
      width: '30%',
      WebkitPrintColorAdjust: 'exact',
    },
  };

  // Helper function to format emails without content after the domain
  const options = [
    'instagram.com',
    'facebook.com',
    'twitter.com',
    'yelp.com',
    'pinterest.com',
    'linkedin.com',
  ];
  function getIcon(social: string) {
    switch (social) {
      case 'instagram.com':
        return <InstagramIcon />;

      case 'yelp.com':
        return <AirplayIcon />;
      case 'facebook.com':
        return <FacebookIcon />;
      case 'twitter.com':
        return <TwitterIcon />;

      case 'pinterest.com':
        return <PinterestIcon />;
      case 'linkedin.com':
        return <LinkedinIcon />;
    }
  }

  function generateImprovementPoints(data: any) {
    const points = [];
    if (data.google && !data.analytics) {
      points.push(
        'Running Google Ads without using Google Analytics can lead to ineffective spending. Set up tracking to measure ad performance and adjust strategies accordingly.'
      );
    }
    if (data.facebook && !data.analytics) {
      points.push(
        'Running Facebook Ads without using Google Analytics can lead to ineffective spending. Set up tracking to measure ad performance and adjust strategies accordingly.'
      );
    }
    if (data.facebook && !data.mailtoLinks) {
      points.push(
        'Running Facebook Ads but not having clickable email links can lead to missed communication opportunities with potential clients. Ensure that email links are properly set up.'
      );
    }

    if (data.google && !data.mailtoLinks) {
      points.push(
        'Running Google Ads but not having clickable email links can lead to missed communication opportunities with potential clients. Ensure that email links are properly set up.'
      );
    }

    if (data.google && !data.telLinks) {
      points.push(
        'Running Google Ads but not having clickable phone number links can lead to missed communication opportunities with potential clients. Ensure that email links are properly set up.'
      );
    }
    if (data.facebook && !data.telLinks) {
      points.push(
        'Running Google Ads but not having clickable phone number links can lead to missed communication opportunities with potential clients. Ensure that email links are properly set up.'
      );
    }
    // Business Info Metrics
    if (!data.isResponsive) {
      points.push(
        'The website is not responsive. This can lead to a poor user experience on mobile devices, potentially losing customers who browse on their phones. Consider optimizing the site for mobile use.'
      );
    }

    if (!data.telLinks) {
      points.push(
        'The phone number is not clickable. This may frustrate users who want to contact you quickly. Ensure that the phone number is linked properly for mobile users.'
      );
    }
    if (!data.mailtoLinks) {
      points.push(
        "The email addresses are not clickable. This can deter potential customers from reaching out. Make sure to link email addresses using 'mailto' to facilitate easy contact."
      );
    }

    // Security
    if (!data.ssl) {
      points.push(
        'The website is not secure (SSL certificate not found). This could deter users from trusting your site, especially when submitting sensitive information. Consider obtaining an SSL certificate.'
      );
    }

    // Page Speed
    if (data.pageSpeed > 5) {
      points.push(
        "The page speed is too slow. A slow-loading website can lead to high bounce rates and lost conversions. Optimize your site's speed by compressing images and reducing server response time."
      );
    } else if (data.pageSpeed > 3) {
      points.push(
        "The page speed could be faster. A slow-loading website can lead to high bounce rates and lost conversions. Optimize your site's speed by compressing images and reducing server response time."
      );
    }

    // H1 Optimization
    if (!data.h1Count) {
      points.push(
        'There are no H1 tags on your pages. H1 tags are crucial for SEO as they signal to search engines what your page is about. Ensure that you use a clear and relevant H1 tag.'
      );
    } else if (data.h1Count > 1) {
      points.push(
        "Multiple H1 tags detected. Having more than one H1 tag can confuse search engines and dilute the focus of your page. It's best to have a single H1 tag per page."
      );
    }

    // Phone and Email Links

    // Internal and External Links
    if (data.internalLinks === 0) {
      points.push(
        'No internal links found. Internal links are important for SEO as they help search engines understand your site structure. Consider adding relevant internal links.'
      );
    }
    if (data.externalLinks === 0) {
      points.push(
        "No external links found. Linking to authoritative external sources can improve your site's credibility and SEO. Consider adding links to reputable sites."
      );
    }

    // Image Optimization
    if (data.imageInfo === 0) {
      points.push(
        'No image optimization detected. Images without alt tags can affect SEO and accessibility. Make sure to add descriptive alt tags to all images.'
      );
    }

    // Social Media Exposure
    if (!data.google || !data.facebook || !data.linkedin || !data.twitter) {
      const socialMediaPoints = [];
      if (!data.google) socialMediaPoints.push('Google Ads');
      if (!data.facebook) socialMediaPoints.push('Facebook Ads');
      if (!data.linkedin) socialMediaPoints.push('LinkedIn Ads');
      if (!data.twitter) socialMediaPoints.push('Twitter Ads');

      points.push(
        `Consider utilizing the following advertising platforms for better exposure: ${socialMediaPoints.join(
          ', '
        )}. This can significantly increase your visibility and attract more customers.`
      );
    }

    // Google Rating and Reviews
    if (parseFloat(data.rating) < 4.0) {
      points.push(
        'The Google rating is low. A low rating can deter potential customers. Encourage satisfied customers to leave positive reviews to improve your online reputation.'
      );
    }
    if (data?.reviews?.replace(/[()]/g, '').trim() < 10) {
      points.push(
        'Limited Google reviews may make potential customers skeptical. Actively solicit reviews from clients to enhance your credibility and attract new customers.'
      );
    }

    // Crossover Points

    return points;
  }

  const { available, unavailable } = options.reduce(
    (acc: any, option) => {
      const foundLink = dummyReport.socialMediaLinks.find((link: any) =>
        link.includes(option)
      );
      if (foundLink) {
        acc.available.push(option); // Add to available if found
      } else {
        acc.unavailable.push(option); // Add to unavailable if not found
      }
      return acc;
    },
    { available: [], unavailable: [] }
  );
  let availableSocials = available;
  let unavailableSocials = unavailable;

  return (
    <div style={styles.container}>
      <div style={styles.flex}>
        <div>
          {dummyReport.Name && (
            <div style={styles.infoRow}>
              <span style={styles.label}>{dummyReport.Name}</span>
            </div>
          )}
          <div style={styles.infoRow}>
            <span style={styles.label}></span>
            <a
              href={dummyReport.url}
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dummyReport.url}
            </a>
          </div>
        </div>
      </div>
      <ScoreSection data={dummyReport} />
      <div
        style={{
          display: 'flex',
          gap: '26px',
          rowGap: '60px',
          flexWrap: 'wrap',
        }}
      >
        <div style={styles.card}>
          <div
            style={{ paddingRight: '30px', borderRight: '1px solid #e0e0e0' }}
          >
            <div>
              <p>Where you are advertising?</p>
              <div style={{ display: 'flex', gap: '10px', margin: '15px 0px' }}>
                {dummyReport.facebook && <Facebook stroke="0" fill="#1877F2" />}
                {dummyReport.linkedin && <Linkedin stroke="0" fill="#0072b1" />}
                {dummyReport.twitter && <Twitter stroke="0" fill="#1da1f2" />}
                {dummyReport.facebook && <Instagram color="#E1306C" />}
                {dummyReport.google && (
                  <GoogleIcon style={{ color: '#EA4335' }} />
                )}
              </div>
            </div>
            <div>
              <p>Where you missing out?</p>
              <div style={{ display: 'flex', gap: '10px', margin: '15px 0px' }}>
                {!dummyReport.facebook && (
                  <Facebook stroke="0" fill="#1877F2" />
                )}
                {!dummyReport.linkedin && (
                  <Linkedin stroke="0" fill="#0072b1" />
                )}
                {!dummyReport.twitter && <Twitter stroke="0" fill="#1da1f2" />}
                {!dummyReport.facebook && <Instagram color="#E1306C" />}
                {!dummyReport.google && (
                  <GoogleIcon stroke="0" style={{ color: '#EA4335' }} />
                )}
              </div>
            </div>
            <div>
              <p>Are you using Google Analytics</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                {dummyReport.gtm || dummyReport.analytics ? (
                  <CheckIcon style={{ color: 'green' }} />
                ) : (
                  <CloseIcon style={{ color: 'red' }} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={styles.card}>
          <div
            style={{ paddingRight: '30px', borderRight: '1px solid #e0e0e0' }}
          >
            <div>
              <p>Heading Metrics:</p>
              <div
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  gap: '30px',
                  margin: '15px 0px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 'fit-content',
                      padding: '5px 12px',
                      background: '#d0d0d0',
                      borderRadius: '50px',
                    }}
                  >
                    {dummyReport.noH1}
                  </div>
                  <p style={{ fontSize: '14px' }}>H1 Tag</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 'fit-content',
                      padding: '5px 12px',
                      background: '#d0d0d0',
                      borderRadius: '50px',
                    }}
                  >
                    {dummyReport.noH2}
                  </div>
                  <p style={{ fontSize: '14px' }}>H2 Tag</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 'fit-content',
                      padding: '5px 12px',
                      background: '#d0d0d0',
                      borderRadius: '50px',
                    }}
                  >
                    {dummyReport.noH3}
                  </div>
                  <p style={{ fontSize: '14px' }}>H3 Tag</p>
                </div>
              </div>

              <p style={{ marginTop: '28px' }}>Primary Heading:</p>
              <p style={{ fontSize: '16px', marginTop: '12px' }}>
                {dummyReport.primaryH1
                  ? dummyReport.primaryH1
                  : 'No primary heading found'}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  marginTop: '12px',
                  color:
                    Number(dummyReport.noH1) === 0 ||
                    Number(dummyReport.noH1) > 1 ||
                    Number(dummyReport.noH2) === 0
                      ? 'red'
                      : 'green',
                }}
              >
                {Number(dummyReport.noH1) === 0
                  ? 'No H1 Found'
                  : Number(dummyReport.noH1) > 1
                  ? 'More than 1 h1 found'
                  : Number(dummyReport.noH2) === 0
                  ? 'No H2 found, structuring issue.'
                  : 'Headings are optimized'}
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '36px',
            width: '330px',
          }}
        >
          <div>
            <div>
              <div>
                <p>Clickable Contacts?</p>
                <div
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    gap: '10px',
                    margin: '15px 0px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '20px',
                      alignItems: 'center',
                    }}
                  >
                    <Mail color={dummyReport.mailtoLinks ? 'green' : 'red'} />
                    <Phone color={dummyReport.telLinks ? 'green' : 'red'} />
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    color:
                      !dummyReport.mailtoLinks || !dummyReport.telLinks
                        ? 'red'
                        : 'green',
                  }}
                >
                  {!dummyReport.mailtoLinks && !dummyReport.telLinks
                    ? 'Phone and email are not clickable'
                    : !dummyReport.mailtoLinks
                    ? 'Email is not clickable'
                    : !dummyReport.telLinks
                    ? 'Phone number is not clickable'
                    : 'Contacts are optimized'}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p>Site security</p>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  margin: '15px 0px',
                }}
              >
                {dummyReport.ssl ? (
                  <ShieldCheck color="green" />
                ) : (
                  <ShieldAlert color="red" />
                )}
                <p
                  style={{
                    fontSize: '14px',
                    color: !dummyReport.ssl ? 'red' : 'green',
                    width: '250px',
                  }}
                >
                  {dummyReport.ssl
                    ? 'Site is secured, SSL certificate is installed'
                    : 'Site insecure, SSL certificate is not installed'}
                </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div style={styles.card}>
          <div
            style={{
              paddingRight: '30px',
              borderRight: '1px solid #e0e0e0',
            }}
          >
            <div>
              <p>Meta Data:</p>
              <p style={{ fontSize: '16px', marginTop: '10px' }}>Title:</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>
                {dummyReport.metaTitle}
              </p>
              <p
                style={{
                  color: dummyReport.metaTitle.length > 60 ? 'red' : 'green',
                  fontSize: '14px',
                  marginTop: '8px',
                }}
              >
                {dummyReport.metaTitle.length > 60
                  ? 'Not optimized, too long'
                  : 'Optimized, perfect length'}
              </p>
              <p style={{ fontSize: '16px', marginTop: '10px' }}>
                Description:
              </p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>
                {dummyReport.metaDescriptions}
              </p>
              <p
                style={{
                  color:
                    dummyReport.metaDescriptions.length > 160 ? 'red' : 'green',
                  fontSize: '14px',
                  marginTop: '8px',
                }}
              >
                {dummyReport.metaDescriptions.length > 160
                  ? 'Not optimized, too long'
                  : 'Optimized, perfect length'}
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '40px',
            paddingRight: '30px',
            borderRight: '1px solid #e0e0e0',
            width: '30%',
          }}
        >
          <div>
            <div>
              <p>Site Responsiveness</p>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  margin: '15px 0px',
                }}
              >
                <TabletSmartphone
                  color={dummyReport.isResponsive ? 'green' : 'red'}
                />
                <p
                  style={{
                    fontSize: '14px',
                    color: !dummyReport.isResponsive ? 'red' : 'green',
                  }}
                >
                  {dummyReport.isResponsive
                    ? 'Site is compatible with mobile phones'
                    : 'Site is not compatible with mobile phones'}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p>Linking:</p>
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                gap: '10px',
                margin: '15px 0px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 'fit-content',
                    padding: '5px 10px',
                    background: '#d0d0d0',
                    borderRadius: '50px',
                  }}
                >
                  {dummyReport.internalLinks}
                </div>
                <p style={{ fontSize: '14px' }}>Internal Links</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 'fit-content',
                    padding: '5px 10px',
                    background: '#d0d0d0',
                    borderRadius: '50px',
                  }}
                >
                  {dummyReport.externalLinks}
                </div>
                <p style={{ fontSize: '14px' }}>External Links</p>
              </div>
            </div>
            <p
              style={{
                fontSize: '14px',
                color:
                  !dummyReport.internalLinks ||
                  !dummyReport.externalLinks ||
                  dummyReport.internalLinks === 0 ||
                  dummyReport.externalLinks === 0
                    ? 'red'
                    : 'green',
              }}
            >
              {!dummyReport.internalLinks && !dummyReport.externalLinks
                ? 'You dont have any links'
                : !dummyReport.internalLinks || dummyReport.internalLinks === 0
                ? 'No internal links on the page'
                : !dummyReport.externalLinks || dummyReport.externalLinks === 0
                ? 'No external links on the page'
                : 'Links are optimized'}
            </p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '40px',
            width: '30%',
          }}
        >
          <div>
            <div>
              <p>Site Speed</p>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  margin: '15px 0px',
                }}
              >
                <GaugeCircle
                  color={dummyReport.pageSpeed <= 3 ? 'green' : 'red'}
                />
                <div>
                  <p>{Math.round(dummyReport.pageSpeed)}s</p>
                  <p
                    style={{
                      color: dummyReport.pageSpeed > 3 ? 'red' : 'green',
                      fontSize: '14px',
                    }}
                  >
                    {dummyReport.pageSpeed < 3
                      ? 'Site is fast and optimized'
                      : 'Site is slow and unoptimized'}
                  </p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div>
            <div>
              <div>
                <p>Image Optimization:</p>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    margin: '15px 0px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 'fit-content',
                        padding: '5px 10px',
                        background: '#d0d0d0',
                        borderRadius: '50px',
                      }}
                    >
                      {dummyReport.totalImages}
                    </div>
                    <p style={{ fontSize: '14px' }}>Total Images</p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 'fit-content',
                        padding: '5px 10px',
                        background: '#d0d0d0',
                        borderRadius: '50px',
                      }}
                    >
                      {dummyReport.imagesWithAlt}
                    </div>
                    <p style={{ fontSize: '14px' }}>Images with Alt</p>
                  </div>
                </div>
                <p style={{ fontSize: '14px' }}>
                  {dummyReport.imagesWithAlt !== dummyReport.totalImages
                    ? `${
                        100 -
                        Math.floor(
                          (dummyReport.imagesWithAlt /
                            dummyReport.totalImages) *
                            100
                        )
                      }% images are not optimized `
                    : 'Images are optimized'}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <p>Social Media Presence</p>
                <div
                  style={{ display: 'flex', gap: '10px', margin: '15px 0px' }}
                >
                  {availableSocials.includes('facebook.com') && (
                    <Facebook stroke="0" fill="#1877F2" />
                  )}
                  {availableSocials.includes('linkedin.com') && (
                    <Linkedin stroke="0" fill="#0072b1" />
                  )}
                  {availableSocials.includes('twitter.com') && (
                    <Twitter stroke="0" fill="#1da1f2" />
                  )}
                  {availableSocials.includes('instagram.com') && (
                    <Instagram color="#E1306C" />
                  )}
                  {availableSocials.includes('google.com') && (
                    <GoogleIcon style={{ color: '#EA4335' }} />
                  )}
                </div>
              </div>
              <div>
                <p>Where you missing out?</p>
                <div
                  style={{ display: 'flex', gap: '10px', margin: '15px 0px' }}
                >
                  {unavailableSocials.includes('facebook.com') && (
                    <Facebook stroke="0" fill="#1877F2" />
                  )}
                  {unavailableSocials.includes('linkedin.com') && (
                    <Linkedin stroke="0" fill="#0072b1" />
                  )}
                  {unavailableSocials.includes('twitter.com') && (
                    <Twitter stroke="0" fill="#1da1f2" />
                  )}
                  {unavailableSocials.includes('instagram.com') && (
                    <Instagram color="#E1306C" />
                  )}
                  {unavailableSocials.includes('google.com') && (
                    <GoogleIcon style={{ color: '#EA4335' }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '60px' }}>
        <h3 style={{ marginBottom: '15px' }}>What can you improve?</h3>
        <ul>
          {generateImprovementPoints(dummyReport).map((point, i) => {
            return (
              <li style={{ marginBottom: '15px' }} key={i}>
                <p>{point}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Report;

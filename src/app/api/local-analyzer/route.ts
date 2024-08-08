import { NextResponse } from "next/server";
const puppeteer = require("puppeteer");


export async function POST(request: Request) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Origin", "*"); // Adjust this for production
  headers.set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  headers.set("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { headers, status: 204 });
  }

  if (request.method === "POST") {
    try {
      const { url } = await request.json();
      console.log("Parsed JSON data:", url);
      const data = await auditWebsites(url);
      return NextResponse.json({ data }, { headers });
    } catch (error) {
      console.error("Error processing websites:", error);
      return new NextResponse("ERROR", { status: 500, headers });
    }
  }

  return new NextResponse("Method Not Allowed", { status: 405, headers });
}
async function auditWebsites(urls: any) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    timeout: 60000,
  });

  try {
    const batchSize = 3; // Adjust the batch size as needed
    const auditResults = [];

    for (let i = 0; i < urls.length; i += batchSize) {
      const batchUrls = urls.slice(i, i + batchSize);
      const batchAuditPromises = batchUrls.map(async (url: any) => {
        try {
          const page = await browser.newPage();
          const auditData = await performWebsiteAudit(page, url, browser);
          await page.close();
          return auditData;
        } catch (error) {
          console.error(`Error while auditing ${url}: ${error}`);
          return { url, error: "An error occurred during the audit." };
        }
      });

      const batchAuditResults = await Promise.all(batchAuditPromises);
      auditResults.push(...batchAuditResults);
    }

    return auditResults;
  } catch (error) {
    console.error("Error during audits:", error);
    throw error; // Rethrow the error to be caught by the calling function
  } finally {
    await browser.close();
  }
}

async function performWebsiteAudit(page: any, url: any, browser: any) {
  try {
    await page.goto(url);

    const mailtoLinkExists = await checkClickableContacts(page);
    const isRunningGoogleAds = await checkGoogleAds(page);
    const socialMediaLinks = await checkSocialMediaLinks(page);
    const headingsInfo = await checkHeadings(page);
    const metaDescriptions = await checkMetaDescriptions(page);
    const isResponsive = await checkResponsiveDesign(page);
    const { internalLinks, externalLinks } =
      await countInternalAndExternalLinks(page);
    const imageInfo = await checkImages(page);
    const { h1Count, primaryH1 } = headingsInfo;
    const pageSpeed = await checkPageSpeed(page);

    const { google, facebook, linkedin, twitter, analytics, gtm } =
      isRunningGoogleAds;
    const { mailtoLinks, telLinks, email, phone } = mailtoLinkExists;

    return {
      mailtoLinks,
      telLinks,
      google,
      facebook,
      linkedin,
      twitter,
      analytics,
      gtm,
      email,
      phone,
      socialMediaLinks,
      h1Count,
      primaryH1,
      metaDescriptions,
      isResponsive,
      internalLinks,
      externalLinks,
      imageInfo,
      pageSpeed,
      url,
    };
  } catch (error) {
    console.error(`Error during audit of ${url}:`, error);
    throw error; // Rethrow the error to be caught by the calling function
  }
}

async function checkPageSpeed(page: any) {
  // Measure performance using Puppeteer's PageSpeed API
  const performance = await page.evaluate(() => {
    return JSON.stringify(window.performance.timing);
  });

  // Parse the JSON string into an object
  const performanceData = JSON.parse(performance);

  // Convert the values from milliseconds to seconds
  for (const key in performanceData) {
    performanceData[key] /= 1000;
  }

  // Calculate the time taken for the complete page to load in seconds
  const loadTime =
    performanceData.loadEventEnd - performanceData.navigationStart;

  return loadTime;
}

async function checkImages(page: any) {
  const imageElements = await page.$$("img");
  const totalImages = imageElements.length;
  let imagesWithAlt = 0;

  for (const imgElement of imageElements) {
    const altAttribute = await imgElement.evaluate((el: any) =>
      el.getAttribute("alt")
    );

    if (altAttribute && altAttribute.trim() !== "") {
      imagesWithAlt++;
    }
  }
  const optimImage = Math.floor((imagesWithAlt / totalImages) * 100);
  return optimImage;
}

async function countInternalAndExternalLinks(page: any) {
  const links = await page.$$eval("a", (elements: any) =>
    elements.map((element: any) => element.getAttribute("href"))
  );
  const { hostname: pageHostname } = new URL(page.url());
  let internalLinks = 0;
  let externalLinks = 0;

  for (const link of links) {
    if (!link || !link.includes("http")) {
      continue;
    }

    const { hostname } = new URL(link);
    if (!hostname) {
      // Handle relative links or invalid URLs
      continue;
    }

    if (hostname === pageHostname) {
      internalLinks++;
    } else {
      externalLinks++;
    }
  }

  return { internalLinks, externalLinks };
}

async function checkResponsiveDesign(page: any) {
  // You can customize this logic based on your specific criteria for responsive design.
  // For example, you can check the presence of a mobile viewport meta tag.

  const metaViewport = await page.evaluate(() => {
    const metaViewportElement = document.querySelector('meta[name="viewport"]');
    if (metaViewportElement) {
      return metaViewportElement.getAttribute("content");
    }
    return null;
  });

  return metaViewport && metaViewport.includes("width=device-width");
}

async function checkSocialMediaLinks(page: any) {
  // Define social media platforms to check
  const socialMediaPlatforms: any = [
    "instagram.com",
    "facebook.com",
    "twitter.com",
    "yelp.com",
    "pinterest.com",
    "linkedin.com",
  ];

  const socialMediaLinks: any = {};

  for (const platform of socialMediaPlatforms) {
    const socialMediaLink = await getSocialMediaLink(page, platform);
    if (socialMediaLink) {
      socialMediaLinks[platform] = socialMediaLink;
    }
  }

  return socialMediaLinks;
}

async function checkHeadings(page: any) {
  const h1Tags = await page.$$("h1");
  let primaryH1 = null;
  let h1Opt = null;

  if (h1Tags.length > 0) {
    primaryH1 = await page.evaluate((el: any) => el.textContent, h1Tags[0]);
  }

  if (h1Tags) {
    if (h1Tags.length === 1) {
      h1Opt = true;
    } else {
      h1Opt = false;
    }
  }
  return {
    h1Count: h1Opt,
    primaryH1: primaryH1,
  };
}

async function checkMetaDescriptions(page: any) {
  const metaDescriptionElement = await page.$('meta[name="description"]');
  let metaDescription = null;

  if (metaDescriptionElement) {
    metaDescription = await page.evaluate(
      (el: any) => el.getAttribute("content"),
      metaDescriptionElement
    );
  }

  return metaDescription;
}

async function getSocialMediaLink(page: any, platform: any) {
  const selector = `a[href*="${platform}"]`;
  const linkElement = await page.$(selector);

  if (linkElement) {
    return page.evaluate((el: any) => el.href, linkElement);
  }

  return null;
}

async function checkClickableContacts(page: any) {
  const mailtoLinks = await page.$$('a[href^="mailto:"]');
  const telLinks = await page.$$('a[href^="tel:"]');

  const getEmailsAndPhones = async (links: any) => {
    const data : any = { emails: [], phones: [] };
    for (const link of links) {
      const href = await page.evaluate(
        (link: any) => link.getAttribute("href"),
        link
      );
      if (href && href.startsWith("mailto:")) {
        data.emails.push(href.replace("mailto:", ""));
      } else if (href && href.startsWith("tel:")) {
        data.phones.push(href.replace("tel:", ""));
      }
    }
    return data;
  };

  const emailPhoneData = {
    mailtoLink: await getEmailsAndPhones(mailtoLinks),
    telLink: await getEmailsAndPhones(telLinks),
  };
  const { mailtoLink, telLink } = emailPhoneData;
  return {
    mailtoLinks: mailtoLinks.length > 0,
    telLinks: telLinks.length > 0,
    email: mailtoLink.emails,
    phone: telLink.phones,
  };
}

async function checkGoogleAds(page: any) {
  const adsPresent = {
    google: false,
    facebook: false,
    linkedin: false,
    twitter: false,
    analytics: false,
    gtm: false,
  };

  const searchString = "https://googleads.g.doubleclick.net";
  // Enable request interception
  const client = await page.target().createCDPSession();
  await client.send("Network.enable");

  // Listen for network requests.
  client.on("Network.responseReceived", (response: any) => {
    const url = response.response.url;
    if (url.includes("googleads.g.doubleclick.net")) {
      adsPresent.google = true;
    }
  });

  // You may also filter by MIME type if needed:
  // client.send('Network.setRequestInterception', { patterns: [{ urlPattern: '*/*' }] });

  await page.waitForSelector("script[src]");
  page.on("response", (response: any) => {
    const url = response.url();
    if (url.includes("googleads.g.doubleclick.net")) {
      adsPresent.google = true;
    }
  });

  const scripts = await page.$$eval("script[src]", (elements: any) => {
    return elements.map((element: any) => element.getAttribute("src"));
  });

  const asyncScripts = await page.$$eval("script[async]", (scripts: any) => {
    return scripts.map((script: any) => {
      return {
        src: script.src,
      };
    });
  });

  // Filter for async scripts.
  asyncScripts.forEach((script: any) => {
    scripts.push(script.src);
  });

  for (const script of scripts) {
    if (!script || !script.includes("http")) {
      continue;
    } else if (script.includes(searchString)) {
      adsPresent.google = true;
    }
    if (script.includes("connect.facebook.net")) {
      adsPresent.facebook = true;
    }
    if (
      script.includes("ads.linkedin.com") ||
      script.includes("platform.linkedin.com") ||
      script.includes("https://snap.licdn.com")
    ) {
      adsPresent.linkedin = true;
    }

    if (
      script.includes("static.ads-twitter.com") ||
      script.includes("platform.twitter.com")
    ) {
      adsPresent.twitter = true;
    }
    if (script.includes("www.google-analytics.com")) {
      adsPresent.analytics = true;
    }
    if (script.includes("www.googletagmanager.com")) {
      adsPresent.analytics = true;
      adsPresent.gtm = true;
    }
  }

  return adsPresent;
}

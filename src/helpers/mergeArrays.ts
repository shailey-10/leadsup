export default function mergeArrays(array1: any[], array2: any[]) {
  return array1.map((obj1: any) => {
    const obj2 = array2.find((item: { url: any }) => obj1.Website === item.url);
    const nonWebsiteObj = {
      ...obj1,
      mailtoLinks: "No Data",
      telLinks: "No Data",
      google: "No Data",
      facebook: "No Data",
      linkedin: "No Data",
      twitter: "No Data",
      analytics: "No Data",
      gtm: "No Data",
      mailtoLinkExists: "No Data",
      socialMediaLinks: "No Data",
      h1Count: "No Data",
      primaryH1: "No Data",
      metaDescriptions: "No Data",
      isResponsive: "No Data",
      internalLinks: "No Data",
      externalLinks: "No Data",
      imageInfo: "No Data",
      pageSpeed: "No Data",
      ssl: "No Data",
    };
    let Phone: string[] = [];
    Phone = (obj2?.Phone || []).concat(obj1?.Phone || []);
    return obj2 ? { ...obj1, ...obj2, Phone } : nonWebsiteObj;
  });
}

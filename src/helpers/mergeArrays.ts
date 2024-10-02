export default function mergeArrays(array1: any[], array2: any[]) {
  return array1.map((obj1: any) => {
    const obj2 = array2.find((item: { url: any }) => obj1.Website === item.url);
    const nonWebsiteObj = {
      ...obj1,
    };
    let Phone: string[] = [];
    Phone = (obj2?.Phone || []).concat(obj1?.Phone || []);
    return obj2 ? { ...obj1, ...obj2, Phone } : nonWebsiteObj;
  });
}

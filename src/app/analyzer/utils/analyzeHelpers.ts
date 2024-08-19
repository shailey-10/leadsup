import mergeArrays from "@/helpers/mergeArrays";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { setFilteredWebsiteData } from "../../redux/filteredWebsiteData";
import { setWebsiteData } from '../../redux/websiteData';

export const handleAnalyze = async (analyzerStates: {
  searches: number;
  setLoading: (loading: boolean) => void;
  activeTab: string;
  searchQuery: string;
  websiteUrl: string;
  websites: string[];
  idToken: string;
  dispatch: Function;
  user: any;
  setSearches: (searches: number) => void;
  parsedData: any;
  setParsedData: (parsedData: any) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  analyzedCount: number;
  setAnalyzedCount: (count: number) => void;
  allWebsiteUrls: string[];
  setAllWebsiteUrls: (urls: string[]) => void;
}) => {
  const {
    searches,
    setLoading,
    setLoadingMessage,
    activeTab,
    searchQuery,
    websiteUrl,
    websites,
    idToken,
    dispatch,
    user,
    setSearches,
    parsedData,
    setParsedData,
        analyzedCount,
    setAnalyzedCount,
    allWebsiteUrls,
    setAllWebsiteUrls,
  } = analyzerStates;
  if (searches <= 0) {
    alert("Not enough credits left, please connect to team for more credits");
    return;
  }

  let dataToAnalyze: string[] = [];
  
  switch (activeTab) {
    case "search":
      dataToAnalyze = [searchQuery];
      setLoadingMessage('Finding "' + searchQuery + '"...');
      break;
      case "url":
      dataToAnalyze = [websiteUrl];
      setLoadingMessage('Analyzing "' + websiteUrl + '"...');
      break;
      case "csv":
        dataToAnalyze = websites;
        setLoadingMessage('Analyzing ' + websites.length + ' websites from CSV...');
        break;
      }
      setLoading(true);
      
  if (activeTab === 'search') {
    await analyzeSearch(dataToAnalyze, idToken, setLoading, setParsedData,dispatch, user, searches, setSearches, parsedData,activeTab, setLoadingMessage, analyzedCount, setAnalyzedCount, allWebsiteUrls, setAllWebsiteUrls);
        setLoading(false);

  } else {
    await analyzeUrls(dataToAnalyze, idToken, dispatch, user, searches, setSearches, parsedData, setLoading,activeTab);
        setLoading(false);

  }
};

const analyzeSearch = async (searchQuery: string[], idToken: string, setLoading: Function, setParsedData: Function, dispatch: Function, user: any, searches: number, setSearches: Function, parsedData: any[],activeTab: string, setLoadingMessage: Function, analyzedCount: number, setAnalyzedCount: Function, allWebsiteUrls: string[], setAllWebsiteUrls: Function) => {
  const apiUrl = `http://localhost:8080/api/leads/getData`;
  const requestData = { url: searchQuery };

  try {
    // const response = await fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + idToken,
    //   },
    //   body: JSON.stringify(requestData),
    // });

    // if (!response.ok) {
    //   setLoading(false);
    //   throw new Error(`HTTP error! status: ${response.status}`);

    // }

const test =  [
    {
        "Name": "Family Dentistry of New Jersey",
        "rating": "5.0",
        "reviews": "(68)",
        "Website": "https://familydentistryofnewjersey.com",
        "Phone": [
            "+1 732-458-2288"
        ],
        "Address": "56 Ramtown-Greenville Rd, Howell Township, NJ 07731, United States",
        "ssl": true
    },
    {
        "Name": "South Jersey Family Dental",
        "rating": "4.9",
        "reviews": "(348)",
        "Website": "https://www.localmed.com",
        "Phone": [
            "+1 856-227-2554"
        ],
        "Address": "900 NJ-168 Suite I-6, Turnersville, NJ 08012, United States",
        "ssl": true
    },
    {
        "Name": "Harrison Family Dentist",
        "rating": "4.8",
        "reviews": "(836)",
        "Website": "https://www.harrisonfamilydentistnj.com",
        "Phone": [
            "+1 973-241-5900"
        ],
        "Address": "300 Harrison Ave, Harrison, NJ 07029, United States",
        "ssl": true
    },
    {
        "Name": "The Comprehensive Dental Center of Central New Jersey",
        "rating": "5.0",
        "reviews": "(75)",
        "Website": "https://patients.doctor.com",
        "Phone": [
            "+1 609-584-7200"
        ],
        "Address": "2279 NJ-33 Suite 504, Hamilton Square, NJ 08690, United States",
        "ssl": true
    },
    {
        "Name": "Montclair Dental Spa",
        "rating": "4.7",
        "reviews": "(426)",
        "Website": "https://www.montclairdentalspanj.com",
        "Phone": [
            "+1 973-744-1527"
        ],
        "Address": "204 Claremont Ave, Montclair, NJ 07042, United States",
        "ssl": true
    },
    {
        "Name": "Family Dental Care of South Jersey",
        "rating": "4.8",
        "reviews": "(1,013)",
        "Website": "http://www.familydentalcareofsouthjersey.com",
        "Phone": [
            "+1 856-309-2244"
        ],
        "Address": "707 County Rte 561 unit b, Voorhees Township, NJ 08043, United States",
        "ssl": false
    },
    {
        "Name": "NJ Laser Dentistry",
        "rating": "5.0",
        "reviews": "(690)",
        "Website": "https://www.njlaserdentistry.com",
        "Phone": [
            "+1 732-210-6306"
        ],
        "Address": "818 Shrewsbury Ave, Tinton Falls, NJ 07724, United States",
        "ssl": true
    },
    {
        "Name": "New Jersey Dental Arts",
        "rating": "4.9",
        "reviews": "(255)",
        "Website": "https://local.demandforce.com",
        "Phone": [
            "+1 973-743-7575"
        ],
        "Address": "326 Broad St, Bloomfield, NJ 07003, United States",
        "ssl": true
    },
    {
        "Name": "The Art of Dentistry and Spa",
        "rating": "4.9",
        "reviews": "(632)",
        "Website": "http://www.theartofdentistrynj.com",
        "Phone": [
            "+1 732-422-5122"
        ],
        "Address": "32 Worlds Fair Dr, Somerset, NJ 08873, United States",
        "ssl": false
    },
    {
        "Name": "Dental Arts Group - New Egypt",
        "rating": "4.9",
        "reviews": "(336)",
        "Website": "https://patientportal-cs4.carestack.com",
        "Phone": [
            "+1 609-359-0034"
        ],
        "Address": "4 Jacobstown Rd, New Egypt, NJ 08533, United States",
        "ssl": true
    },
    {
        "Name": "AV Dental Associates of Jersey City",
        "rating": "4.8",
        "reviews": "(1,071)",
        "Website": "https://www.localmed.com",
        "Phone": [
            "+1 201-484-7759"
        ],
        "Address": "642 Newark Ave, Jersey City, NJ 07306, United States",
        "ssl": true
    },
    {
        "Name": "Garden State Smiles",
        "rating": "4.8",
        "reviews": "(788)",
        "Website": "https://gardenstatesmilesnb.com",
        "Phone": [
            "+1 732-846-6767"
        ],
        "Address": "1612 NJ-27, North Brunswick Township, NJ 08902, United States",
        "ssl": true
    },
    {
        "Name": "Dr. Dental: Dentistry & Braces",
        "rating": "4.7",
        "reviews": "(541)",
        "Website": "https://app.nexhealth.com",
        "Phone": [
            "+1 973-531-4444"
        ],
        "Address": "41 Ackerman Ave, Clifton, NJ 07011, United States",
        "ssl": true
    },
    {
        "Name": "Garden State Smiles of Brick",
        "rating": "4.9",
        "reviews": "(830)",
        "Website": "https://gardenstatesmilesofbrick.com",
        "Phone": [
            "+1 732-477-5770"
        ],
        "Address": "525 NJ-70 Ste 1A, Brick Township, NJ 08723, United States",
        "ssl": true
    },
    {
        "Name": "Great Smiles of New Jersey",
        "rating": "4.9",
        "reviews": "(172)",
        "Website": "http://www.greatsmilesnj.com",
        "Phone": [
            "+1 908-561-0225"
        ],
        "Address": "10 Shawnee Dr Suite A5, Watchung, NJ 07069, United States",
        "ssl": false
    },
    {
        "Name": "NÜVA Smile",
        "rating": "5.0",
        "reviews": "(249)",
        "Website": "https://www.nuvasmile.com",
        "Phone": [
            "+1 848-308-1213"
        ],
        "Address": "1070 NJ-18, East Brunswick, NJ 08816, United States",
        "ssl": true
    },
    {
        "Name": "Specialized Dentistry of New Jersey",
        "rating": "4.8",
        "reviews": "(77)",
        "Website": "https://forms.office.com",
        "Phone": [
            "+1 732-410-7101"
        ],
        "Address": "224 Taylors Mills Rd #110, Manalapan Township, NJ 07726, United States",
        "ssl": true
    },
    {
        "Name": "One Dental New Jersey",
        "rating": "5.0",
        "reviews": "(222)",
        "Website": "https://flexbook.me",
        "Phone": [
            "+1 908-409-0881"
        ],
        "Address": "3900 Park Ave Suite #102, Edison, NJ 08820, United States",
        "ssl": true
    },
    {
        "Name": "Dental Studio of Jersey City",
        "rating": "4.8",
        "reviews": "(409)",
        "Website": "https://www.dentalstudiojc.com",
        "Phone": [
            "+1 551-222-4493"
        ],
        "Address": "370 1st St, Jersey City, NJ 07302, United States",
        "ssl": true
    },
    {
        "Name": "Aesthetic Smiles of New Jersey",
        "rating": "4.9",
        "reviews": "(489)",
        "Website": "https://www.aestheticsmilesofnj.com",
        "Phone": [
            "+1 973-285-5480"
        ],
        "Address": "310 Madison Ave #210, Morristown, NJ 07960, United States",
        "ssl": true
    },
    {
        "Name": "Fords Family Dental Care",
        "rating": "4.9",
        "reviews": "(338)",
        "Website": "https://fordsfamilydental.com",
        "Phone": [
            "+1 732-738-9087"
        ],
        "Address": "532 New Brunswick Ave, Fords, NJ 08863, United States",
        "ssl": true
    },
    {
        "Name": "Midtown Dental Group Jersey City",
        "rating": "4.9",
        "reviews": "(329)",
        "Website": "https://app.nexhealth.com",
        "Phone": [
            "+1 201-200-0500"
        ],
        "Address": "75 Montgomery St Ste 503, Jersey City, NJ 07302, United States",
        "ssl": true
    },
    {
        "Name": "The New Jersey Center for Laser and Cosmetic Dentistry",
        "rating": "4.9",
        "reviews": "(263)",
        "Website": "https://www.drdalbon.com",
        "Phone": [
            "+1 973-244-2424"
        ],
        "Address": "1019 Bloomfield Ave, West Caldwell, NJ 07006, United States",
        "ssl": true
    },
    {
        "Name": "NJ Smiles Dental of Union - Implants & Invisalign",
        "rating": "4.7",
        "reviews": "(112)",
        "Website": "https://www.njsmilesdental.com",
        "Phone": [
            "+1 908-686-0060"
        ],
        "Address": "372 Chestnut St, Union, NJ 07083, United States",
        "ssl": true
    },
    {
        "Name": "True Dental Care",
        "rating": "4.9",
        "reviews": "(922)",
        "Website": "https://www.njsmilesdental.com",
        "Phone": [
            "+1 908-686-0060"
        ],
        "Address": "372 Chestnut St, Union, NJ 07083, United States",
        "ssl": true
    },
    {
        "Name": "West Park Dental",
        "rating": "4.9",
        "reviews": "(549)",
        "Website": "https://westparkdentalnj.com",
        "Phone": [
            "+1 732-493-4344"
        ],
        "Address": "817 W Park Ave, Ocean Township, NJ 07712, United States",
        "ssl": true
    },
    {
        "Name": "Specialized Dentistry of New Jersey",
        "rating": "4.8",
        "reviews": "(77)",
        "Website": "https://forms.office.com",
        "Phone": [
            "+1 732-410-7101"
        ],
        "Address": "224 Taylors Mills Rd #110, Manalapan Township, NJ 07726, United States",
        "ssl": true
    },
    {
        "Name": "Jersey City Dental",
        "rating": "4.7",
        "reviews": "(440)",
        "Website": "https://forms.office.com",
        "Phone": [
            "+1 732-410-7101"
        ],
        "Address": "224 Taylors Mills Rd #110, Manalapan Township, NJ 07726, United States",
        "ssl": true
    },
    {
        "Name": "Jersey City Dental Spa",
        "rating": "4.8",
        "reviews": "(385)",
        "Website": "https://www.dentalnspa.com",
        "Phone": [
            "+1 201-451-1600"
        ],
        "Address": "31 Montgomery St 3rd fl, Jersey City, NJ 07302, United States",
        "ssl": true
    },
    {
        "Name": "KUSER FAMILY DENTAL",
        "rating": "5.0",
        "reviews": "(664)",
        "Website": "https://www.kuserfamilydental.com",
        "Phone": [
            "+1 609-585-8480"
        ],
        "Address": "1771 Kuser Rd, Hamilton Township, NJ 08690, United States",
        "ssl": true
    },
    {
        "Name": "Dentistry of South Jersey: Cherry Hill",
        "rating": "4.9",
        "reviews": "(347)",
        "Website": "https://www.kuserfamilydental.com",
        "Phone": [
            "+1 609-585-8480"
        ],
        "Address": "1771 Kuser Rd, Hamilton Township, NJ 08690, United States",
        "ssl": true
    },
    {
        "Name": "Grove Dental Center",
        "rating": "4.8",
        "reviews": "(434)",
        "Website": "https://www.grovedentaljc.com",
        "Phone": [
            "+1 201-200-0222"
        ],
        "Address": "175 Newark Ave # 2B, Jersey City, NJ 07302, United States",
        "ssl": true
    },
    {
        "Name": "Holistic Dental Center",
        "rating": "4.8",
        "reviews": "(680)",
        "Website": "https://holisticdentalcenternj.com",
        "Phone": [
            "+1 973-833-3240"
        ],
        "Address": "91 Millburn Ave, Millburn, NJ 07041, United States",
        "ssl": true
    },
    {
        "Name": "Dental Cosmetic Center of Edison",
        "rating": "4.9",
        "reviews": "(358)",
        "Website": "https://holisticdentalcenternj.com",
        "Phone": [
            "+1 973-833-3240"
        ],
        "Address": "91 Millburn Ave, Millburn, NJ 07041, United States",
        "ssl": true
    },
    {
        "Name": "Dental Star of New Jersey",
        "rating": "5.0",
        "reviews": "(70)",
        "Website": "http://www.dentalstarnjandny.com",
        "Phone": [
            "+1 732-972-7770"
        ],
        "Address": "74 US-9, Englishtown, NJ 07726, United States",
        "ssl": false
    },
    {
        "Name": "Pleasant Valley Family and Cosmetic Dentistry",
        "rating": "4.9",
        "reviews": "(521)",
        "Website": "http://www.pvimplantdentistry.com",
        "Phone": [
            "+1 856-222-1100"
        ],
        "Address": "301 Fellowship Rd, Mt Laurel Township, NJ 08054, United States",
        "ssl": false
    },
    {
        "Name": "Central Jersey Dental Arts",
        "rating": "4.8",
        "reviews": "(171)",
        "Website": "http://www.pvimplantdentistry.com",
        "Phone": [
            "+1 856-222-1100"
        ],
        "Address": "301 Fellowship Rd, Mt Laurel Township, NJ 08054, United States",
        "ssl": false
    },
    {
        "Name": "Emerald Dental Spa - Union NJ",
        "rating": "5.0",
        "reviews": "(327)",
        "Website": "https://www.emeralddentalspa.com",
        "Phone": [
            "+1 862-347-3239"
        ],
        "Address": "397 Chestnut St # 1, Union, NJ 07083, United States",
        "ssl": true
    },
    {
        "Name": "Advanced Dental Group of Edgewater",
        "rating": "4.9",
        "reviews": "(555)",
        "Website": "https://www.theedgewaterdentalgroup.com",
        "Phone": [
            "+1 201-943-6644"
        ],
        "Address": "725 River Rd #104, Edgewater, NJ 07020, United States",
        "ssl": true
    },
    {
        "Name": "My New Jersey Dentist",
        "rating": "4.5",
        "reviews": "(85)",
        "Website": "https://www.theedgewaterdentalgroup.com",
        "Phone": [
            "+1 201-943-6644"
        ],
        "Address": "725 River Rd #104, Edgewater, NJ 07020, United States",
        "ssl": true
    },
    {
        "Name": "River Edge Dental",
        "rating": "4.9",
        "reviews": "(379)",
        "Website": "https://www.riveredgedental.com",
        "Phone": [
            "+1 201-989-0178"
        ],
        "Address": "130 Kinderkamack Rd #303, River Edge, NJ 07661, United States",
        "ssl": true
    },
    {
        "Name": "Dental Doctors Of NJ",
        "rating": "4.9",
        "reviews": "(100)",
        "Website": "http://dentaldocs4u.com",
        "Phone": [
            "+1 973-450-0511"
        ],
        "Address": "136 Washington Ave, Belleville, NJ 07109, United States",
        "ssl": false
    },
    {
        "Name": "Advanced Dental Group of Hoboken",
        "rating": "4.9",
        "reviews": "(712)",
        "Website": "http://dentaldocs4u.com",
        "Phone": [
            "+1 973-450-0511"
        ],
        "Address": "136 Washington Ave, Belleville, NJ 07109, United States",
        "ssl": false
    },
    {
        "Name": "Harrison Implant and Family Dentistry - Dentists In Harrison",
        "rating": "5.0",
        "reviews": "(245)",
        "Website": "https://book.getweave.com",
        "Phone": [
            "+1 973-484-3443"
        ],
        "Address": "6 Frank E Rodgers Blvd N, Harrison, NJ 07029, United States",
        "ssl": true
    },
    {
        "Name": "Princeton Park Dental Associates",
        "rating": "5.0",
        "reviews": "(422)",
        "Website": "https://princetonparkdental.com",
        "Phone": [
            "+1 609-303-5325"
        ],
        "Address": "188 N Harrison St, Princeton, NJ 08540, United States",
        "ssl": true
    },
    {
        "Name": "Dental Wellness of Clifton",
        "rating": "4.9",
        "reviews": "(267)",
        "Website": "https://princetonparkdental.com",
        "Phone": [
            "+1 609-303-5325"
        ],
        "Address": "188 N Harrison St, Princeton, NJ 08540, United States",
        "ssl": true
    },
    {
        "Name": "NJ Team Dental Center",
        "rating": "4.6",
        "reviews": "(402)",
        "Website": "https://www.njteamdental.com",
        "Phone": [
            "+1 732-679-3600"
        ],
        "Address": "2515 Highway 516, 2nd Floor, 2515 County Rd 516, Old Bridge, NJ 08857, United States",
        "ssl": true
    },
    {
        "Name": "Garden State Smiles of Brick",
        "rating": "4.9",
        "reviews": "(830)",
        "Website": "https://gardenstatesmilesofbrick.com",
        "Phone": [
            "+1 732-477-5770"
        ],
        "Address": "525 NJ-70 Ste 1A, Brick Township, NJ 08723, United States",
        "ssl": true
    },
    {
        "Name": "Tristate Dental Spa",
        "rating": "5.0",
        "reviews": "(328)",
        "Website": "http://malosmileusajerseycity.com",
        "Phone": [
            "+1 201-659-7717"
        ],
        "Address": "35 Journal Square Plaza # 623, Jersey City, NJ 07306, United States",
        "ssl": false
    },
    {
        "Name": "Park Dental Group Family and Cosmetic",
        "rating": "4.9",
        "reviews": "(180)",
        "Website": "http://www.parkdentalgroupllc.com",
        "Phone": [
            "+1 732-993-7412"
        ],
        "Address": "515 Raritan Ave, Highland Park, NJ 08904, United States",
        "ssl": false
    },
    {
        "Name": "South Jersey Dentistry",
        "rating": "4.8",
        "reviews": "(172)",
        "Website": "http://www.sjdentistry.net",
        "Phone": [
            "+1 856-240-0406"
        ],
        "Address": "368 S White Horse Pike, Berlin, NJ 08009, United States",
        "ssl": false
    },
    {
        "Name": "Dr. Arthur Yeh & Associates | Dentist Montclair, NJ | General & Cosmetic Dentistry",
        "rating": "5.0",
        "reviews": "(460)",
        "Website": "https://www.drarthuryeh.com",
        "Phone": [
            "+1 973-338-9595"
        ],
        "Address": "1460 Broad St, Bloomfield, NJ 07003, United States",
        "ssl": true
    },
    {
        "Name": "Dentistry of South Jersey",
        "rating": "4.8",
        "reviews": "(749)",
        "Website": "https://www.dentistryofsouthjersey.com",
        "Phone": [
            "+1 856-845-4225"
        ],
        "Address": "640 Kings Hwy, West Deptford, NJ 08096, United States",
        "ssl": true
    },
    {
        "Name": "Garden State Smiles",
        "rating": "4.8",
        "reviews": "(788)",
        "Website": "https://gardenstatesmilesnb.com",
        "Phone": [
            "+1 732-846-6767"
        ],
        "Address": "1612 NJ-27, North Brunswick Township, NJ 08902, United States",
        "ssl": true
    },
    {
        "Name": "Complete Dental Care",
        "rating": "4.9",
        "reviews": "(190)",
        "Website": "http://drmodi.org",
        "Phone": [
            "+1 732-873-4122"
        ],
        "Address": "25 Clyde Rd #102, Somerset, NJ 08873, United States",
        "ssl": false
    },
    {
        "Name": "Dentistry of South Jersey",
        "rating": "5.0",
        "reviews": "(75)",
        "Website": "http://drmodi.org",
        "Phone": [
            "+1 732-873-4122"
        ],
        "Address": "25 Clyde Rd #102, Somerset, NJ 08873, United States",
        "ssl": false
    },
    {
        "Name": "Jersey Dental Care",
        "rating": "4.6",
        "reviews": "(105)",
        "Website": "http://myjerseydentalcare.com",
        "Phone": [
            "+1 973-372-2330"
        ],
        "Address": "961 Sanford Ave, Irvington, NJ 07111, United States",
        "ssl": false
    },
    {
        "Name": "North Jersey Dental Group",
        "rating": "5.0",
        "reviews": "(231)",
        "Website": "http://www.njdg.com",
        "Phone": [
            "+1 201-461-4800"
        ],
        "Address": "450 Lewis St, Fort Lee, NJ 07024, United States",
        "ssl": false
    },
    {
        "Name": "Paramus Dental Arts",
        "rating": "4.9",
        "reviews": "(170)",
        "Website": "https://paramusdentalarts.com",
        "Phone": [
            "+1 201-845-5533"
        ],
        "Address": "27 Madison Ave Ste 110, Paramus, NJ 07652, United States",
        "ssl": true
    },
    {
        "Name": "Garden State Dental of Newark",
        "rating": "4.6",
        "reviews": "(330)",
        "Website": "https://gardenstatedental.com",
        "Phone": [
            "+1 973-532-2570"
        ],
        "Address": "182 Ferry St, Newark, NJ 07105, United States",
        "ssl": true
    },
    {
        "Name": "Garden State Dental of Newark",
        "rating": "4.6",
        "reviews": "(330)",
        "Website": "https://gardenstatedental.com",
        "Phone": [
            "+1 973-532-2570"
        ],
        "Address": "182 Ferry St, Newark, NJ 07105, United States",
        "ssl": true
    },
    {
        "Name": "Smile Dental Spa (Your Dentist in Jersey City)",
        "rating": "4.9",
        "reviews": "(273)",
        "Website": "https://smiledentspa.com",
        "Phone": [
            "+1 201-479-1233"
        ],
        "Address": "24 Chapel Ave, Jersey City, NJ 07305, United States",
        "ssl": true
    },
    {
        "Name": "NJ Smiles Dental Of Woodbridge",
        "rating": "4.6",
        "reviews": "(79)",
        "Website": "https://www.njsmilesdental.com",
        "Phone": [
            "+1 732-845-6965"
        ],
        "Address": "1170 St Georges Ave, Avenel, NJ 07001, United States",
        "ssl": true
    },
    {
        "Name": "Dr. Dental: Dentistry & Braces",
        "rating": "4.7",
        "reviews": "(428)",
        "Website": "https://www.njsmilesdental.com",
        "Phone": [
            "+1 732-845-6965"
        ],
        "Address": "1170 St Georges Ave, Avenel, NJ 07001, United States",
        "ssl": true
    },
    {
        "Name": "Best Dental Care NJ",
        "rating": "4.9",
        "reviews": "(82)",
        "Website": "http://www.bestdentalnj.com",
        "Phone": [
            "+1 973-383-5700"
        ],
        "Address": "40 Park Pl Suite #108, Newton, NJ 07860, United States",
        "ssl": false
    },
    {
        "Name": "Family Dental Practice of New Jersey, LLC",
        "rating": "4.3",
        "reviews": "(65)",
        "Website": "https://www.familydentalpracticenj.com",
        "Phone": [
            "+1 908-355-7800"
        ],
        "Address": "560 Newark Ave, Elizabeth, NJ 07208, United States",
        "ssl": true
    },
    {
        "Name": "Aesthetic Dentistry of Jersey Shore",
        "rating": "4.9",
        "reviews": "(272)",
        "Website": "http://www.myjerseyshoredentist.com",
        "Phone": [
            "+1 732-695-3202"
        ],
        "Address": "804 W Park Ave Bldg B, Suite 2G, Ocean Township, NJ 07712, United States",
        "ssl": false
    },
    {
        "Name": "The Comprehensive Dental Center of Central New Jersey",
        "rating": "5.0",
        "reviews": "(75)",
        "Website": "https://patients.doctor.com",
        "Phone": [
            "+1 609-584-7200"
        ],
        "Address": "2279 NJ-33 Suite 504, Hamilton Square, NJ 08690, United States",
        "ssl": true
    },
    {
        "Name": "South Jersey Center for Dental Medicine",
        "rating": "5.0",
        "reviews": "(281)",
        "Website": "https://www.marltoncosmeticdentist.com",
        "Phone": [
            "+1 856-596-4333"
        ],
        "Address": "525 NJ-73 STE 105, Marlton, NJ 08053, United States",
        "ssl": true
    },
    {
        "Name": "Haven Dental - Jersey City, New Jersey Dentist",
        "rating": "4.9",
        "reviews": "(105)",
        "Website": "https://www.marltoncosmeticdentist.com",
        "Phone": [
            "+1 856-596-4333"
        ],
        "Address": "525 NJ-73 STE 105, Marlton, NJ 08053, United States",
        "ssl": true
    },
    {
        "Name": "Journal Square Dental - Cosmetic & General Dentist",
        "rating": "4.6",
        "reviews": "(170)",
        "Website": "https://www.journalsquaredental.com",
        "Phone": [
            "+1 551-304-7635"
        ],
        "Address": "1 Journal Square Plaza, Jersey City, NJ 07306, United States",
        "ssl": true
    },
    {
        "Name": "NJ Dental 1",
        "rating": "4.6",
        "reviews": "(78)",
        "Website": "https://www.njdental1.com",
        "Phone": [
            "+1 856-632-1727"
        ],
        "Address": "1050 Kings Hwy N #104, Cherry Hill, NJ 08034, United States",
        "ssl": true
    },
    {
        "Name": "New Smile Dentistry - Husniye Dogan",
        "rating": "4.9",
        "reviews": "(136)",
        "Website": "https://www.njdental1.com",
        "Phone": [
            "+1 856-632-1727"
        ],
        "Address": "1050 Kings Hwy N #104, Cherry Hill, NJ 08034, United States",
        "ssl": true
    },
    {
        "Name": "RiteSmile Dental",
        "rating": "5.0",
        "reviews": "(477)",
        "Website": "https://www.ritesmiledental.com",
        "Phone": [
            "+1 908-255-4794"
        ],
        "Address": "1260 NJ-28 #7, Branchburg, NJ 08876, United States",
        "ssl": true
    },
    {
        "Name": "Deluxe Dentistry-General-Emergency-Cosmetic-Implant-Sedation-Dentistry",
        "rating": "4.9",
        "reviews": "(700)",
        "Website": "https://www.localmed.com",
        "Phone": [
            "+1 609-400-1393"
        ],
        "Address": "100 Federal City Rd Suite 104B, Lawrenceville, NJ 08648, United States",
        "ssl": true
    },
    {
        "Name": "Smiles 'R' Us Dentistry",
        "rating": "4.8",
        "reviews": "(252)",
        "Website": "https://www.localmed.com",
        "Phone": [
            "+1 609-400-1393"
        ],
        "Address": "100 Federal City Rd Suite 104B, Lawrenceville, NJ 08648, United States",
        "ssl": true
    },
    {
        "Name": "Attentive Dental Care of Morristown, New Jersey: Karey P. Matthews, DDS",
        "rating": "4.8",
        "reviews": "(285)",
        "Website": "https://www.dentist-morristown.com",
        "Phone": [
            "+1 973-975-4956"
        ],
        "Address": "95 Madison Ave Suite 401, Morristown, NJ 07960, United States",
        "ssl": true
    },
    {
        "Name": "Edison Dental Arts",
        "rating": "4.7",
        "reviews": "(124)",
        "Website": "https://forms.office.com",
        "Phone": [
            "+1 732-494-7575"
        ],
        "Address": "69 NJ-27, Edison, NJ 08820, United States",
        "ssl": true
    },
    {
        "Name": "Newport Dental Arts",
        "rating": "4.9",
        "reviews": "(34)",
        "Website": "https://forms.office.com",
        "Phone": [
            "+1 732-494-7575"
        ],
        "Address": "69 NJ-27, Edison, NJ 08820, United States",
        "ssl": true
    },
    {
        "Name": "Navesink Dental Care",
        "rating": "5.0",
        "reviews": "(924)",
        "Website": "https://www.navesinkdentalcare.com",
        "Phone": [
            "+1 732-741-7733"
        ],
        "Address": "180 NJ-35, Red Bank, NJ 07701, United States",
        "ssl": true
    },
    {
        "Name": "Abra Dental - Jersey City",
        "rating": "4.6",
        "reviews": "(420)",
        "Website": "http://www.abradental.com",
        "Phone": [
            "+1 551-554-3500"
        ],
        "Address": "165 Ocean Ave, Jersey City, NJ 07305, United States",
        "ssl": false
    },
    {
        "Name": "Canal Vista Family Dental",
        "rating": "4.9",
        "reviews": "(242)",
        "Website": "https://dental4.me",
        "Phone": [
            "+1 609-452-8630"
        ],
        "Address": "100 Canal Pointe Blvd Suite 116, Princeton, NJ 08540, United States",
        "ssl": true
    },
    {
        "Name": "Dental Health 360°",
        "rating": "4.8",
        "reviews": "(145)",
        "Website": "https://www.dentalhealth360.com",
        "Phone": [
            "+1 201-809-9566"
        ],
        "Address": "501 NJ-17, Paramus, NJ 07652, United States",
        "ssl": true
    },
    {
        "Name": "Frost Dental Group",
        "rating": "4.9",
        "reviews": "(144)",
        "Website": "https://www.frostdentalgroup.com",
        "Phone": [
            "+1 201-438-8870"
        ],
        "Address": "75 Orient Wy #203, Rutherford, NJ 07070, United States",
        "ssl": true
    },
    {
        "Name": "JC Dental & Implant Studio",
        "rating": "4.8",
        "reviews": "(156)",
        "Website": "https://www.frostdentalgroup.com",
        "Phone": [
            "+1 201-438-8870"
        ],
        "Address": "75 Orient Wy #203, Rutherford, NJ 07070, United States",
        "ssl": true
    },
    {
        "Name": "Jersey Smile - Berkeley Heights",
        "rating": "4.9",
        "reviews": "(84)",
        "Website": "https://jerseysmile.com",
        "Phone": [
            "+1 908-721-5500"
        ],
        "Address": "495 Plainfield Ave, Berkeley Heights, NJ 07922, United States",
        "ssl": true
    },
    {
        "Name": "Bella Dental",
        "rating": "4.9",
        "reviews": "(876)",
        "Website": "https://www.belladentalnj.com",
        "Phone": [
            "+1 732-739-3070"
        ],
        "Address": "2145 NJ-35 Suite 10, Holmdel, NJ 07733, United States",
        "ssl": true
    },
    {
        "Name": "Dr. Dental: Dentistry & Braces",
        "rating": "4.4",
        "reviews": "(680)",
        "Website": "https://www.belladentalnj.com",
        "Phone": [
            "+1 732-739-3070"
        ],
        "Address": "2145 NJ-35 Suite 10, Holmdel, NJ 07733, United States",
        "ssl": true
    },
    {
        "Name": "Drs. Rosen & Dworkin, PA - Family and Cosmetic Dentistry",
        "rating": "4.9",
        "reviews": "(1,571)",
        "Website": "https://rosendworkin.com",
        "Phone": [
            "+1 856-983-7732"
        ],
        "Address": "350 NJ-73, Marlton, NJ 08053, United States",
        "ssl": true
    },
    {
        "Name": "TK Dental Wayne, NJ | General, Cosmetic, Restorative Dentists. Dental Implants, Crowns, Bridges | Tatyana Kaminar DDS",
        "rating": "4.8",
        "reviews": "(130)",
        "Website": "https://www.tkdentalwayne.com",
        "Phone": [
            "+1 973-423-1200"
        ],
        "Address": "506 Hamburg Tpke #206, Wayne, NJ 07470, United States",
        "ssl": true
    },
    {
        "Name": "New Image Dental",
        "rating": "4.9",
        "reviews": "(138)",
        "Website": "https://www.tkdentalwayne.com",
        "Phone": [
            "+1 973-423-1200"
        ],
        "Address": "506 Hamburg Tpke #206, Wayne, NJ 07470, United States",
        "ssl": true
    },
    {
        "Name": "Skylands Dental of New Jersey, LLC",
        "rating": "4.5",
        "reviews": "(50)",
        "Website": "https://www.jerseydentist.com",
        "Phone": [
            "+1 908-850-0005"
        ],
        "Address": "117 Grand Ave, Hackettstown, NJ 07840, United States",
        "ssl": true
    },
    {
        "Name": "Dental Plus Dental Center",
        "rating": "4.7",
        "reviews": "(155)",
        "Website": "https://www.dentalplusdc.com",
        "Phone": [
            "+1 732-287-6611"
        ],
        "Address": "775 US-1, Edison, NJ 08817, United States",
        "ssl": true
    },
    {
        "Name": "Dental Associates of Jersey City",
        "rating": "4.8",
        "reviews": "(78)",
        "Website": "http://www.dentalassociatesofjerseycity.com",
        "Phone": [
            "+1 201-433-0773"
        ],
        "Address": "2766 John F. Kennedy Blvd, Jersey City, NJ 07306, United States",
        "ssl": false
    },
    {
        "Name": "New Providence Dentistry",
        "rating": "4.9",
        "reviews": "(381)",
        "Website": "https://www.localmed.com",
        "Phone": [
            "+1 908-376-9297"
        ],
        "Address": "571 Central Ave suite 100, New Providence, NJ 07974, United States",
        "ssl": true
    },
    {
        "Name": "Smile Dental Center of NJ - Dr. Maheshkumar Shah (General Dentist) & Khushali Shah DDS (Orthodontist)",
        "rating": "4.9",
        "reviews": "(55)",
        "Website": "https://www.smiledentalnjpa.com",
        "Phone": [
            "+1 201-861-4600"
        ],
        "Address": "7110 Bergenline Ave, North Bergen, NJ 07047, United States",
        "ssl": true
    },
    {
        "Name": "Lyons Family Dentistry",
        "rating": "4.9",
        "reviews": "(328)",
        "Website": "https://www.smiledentalnjpa.com",
        "Phone": [
            "+1 201-861-4600"
        ],
        "Address": "7110 Bergenline Ave, North Bergen, NJ 07047, United States",
        "ssl": true
    },
    {
        "Name": "Bergenfield Dental",
        "rating": "4.9",
        "reviews": "(138)",
        "Website": "http://www.bergenfielddental.com",
        "Phone": [
            "+1 201-384-0100"
        ],
        "Address": "29 W Church St, Bergenfield, NJ 07621, United States",
        "ssl": false
    },
    {
        "Name": "Advanced Periodontics & Implant Dentistry New Jersey",
        "rating": "4.9",
        "reviews": "(191)",
        "Website": "https://www.dentalimplantsusa.com",
        "Phone": [
            "+1 973-988-2661"
        ],
        "Address": "230 Centre St #A, Nutley, NJ 07110, United States",
        "ssl": true
    },
    {
        "Name": "Beautiful Smiles - Cosmetic & Implant Dentistry",
        "rating": "5.0",
        "reviews": "(156)",
        "Website": "https://www.dentalimplantsusa.com",
        "Phone": [
            "+1 973-988-2661"
        ],
        "Address": "230 Centre St #A, Nutley, NJ 07110, United States",
        "ssl": true
    },
    {
        "Name": "Advanced Periodontics & Implant Dentistry New Jersey",
        "rating": "4.9",
        "reviews": "(191)",
        "Website": "https://www.dentalimplantsusa.com",
        "Phone": [
            "+1 973-988-2661"
        ],
        "Address": "230 Centre St #A, Nutley, NJ 07110, United States",
        "ssl": true
    },
    {
        "Name": "Beautiful Smiles - Cosmetic & Implant Dentistry",
        "rating": "5.0",
        "reviews": "(156)",
        "Website": "https://www.beautifulsmilesnj.com",
        "Phone": [
            "+1 973-467-0720"
        ],
        "Address": "280 Millburn Ave, Millburn, NJ 07041, United States",
        "ssl": true
    },
    {
        "Name": "Destination Dental Care",
        "rating": "4.9",
        "reviews": "(99)",
        "Website": "https://www.beautifulsmilesnj.com",
        "Phone": [
            "+1 973-467-0720"
        ],
        "Address": "280 Millburn Ave, Millburn, NJ 07041, United States",
        "ssl": true
    },
    {
        "Name": "A&M Dental Arts",
        "rating": "4.9",
        "reviews": "(558)",
        "Website": "https://www.amdentalarts.com",
        "Phone": [
            "+1 848-253-3681"
        ],
        "Address": "120 NJ-33, Manalapan Township, NJ 07726, United States",
        "ssl": true
    },
    {
        "Name": "Dental Arts Group - New Egypt",
        "rating": "4.9",
        "reviews": "(336)",
        "Website": "https://patientportal-cs4.carestack.com",
        "Phone": [
            "+1 609-359-0034"
        ],
        "Address": "4 Jacobstown Rd, New Egypt, NJ 08533, United States",
        "ssl": true
    },
    {
        "Name": "Atlantic Dental Healthcare: Vaidya Selvan, BDS,DDS,MAGD,FICOI, LLSR",
        "rating": "4.9",
        "reviews": "(180)",
        "Website": "https://patientportal-cs4.carestack.com",
        "Phone": [
            "+1 609-359-0034"
        ],
        "Address": "4 Jacobstown Rd, New Egypt, NJ 08533, United States",
        "ssl": true
    },
    {
        "Name": "Lafayette Dental",
        "rating": "4.9",
        "reviews": "(525)",
        "Website": "http://lafayettefamilydentistrynj.com",
        "Phone": [
            "+1 973-579-7888"
        ],
        "Address": "50 NJ-15, Lafayette, NJ 07848, United States",
        "ssl": false
    },
    {
        "Name": "Dental Care East Hanover",
        "rating": "4.9",
        "reviews": "(575)",
        "Website": "https://www.localmed.com",
        "Phone": [
            "+1 973-845-4155"
        ],
        "Address": "320 NJ-10, East Hanover, NJ 07936, United States",
        "ssl": true
    },
    {
        "Name": "Limitless Dental",
        "rating": "5.0",
        "reviews": "(194)",
        "Website": "https://flexbook.me",
        "Phone": [
            "+1 201-484-0480"
        ],
        "Address": "314 Coles St, Jersey City, NJ 07310, United States",
        "ssl": true
    },
    {
        "Name": "Roxbury Family Dentistry",
        "rating": "5.0",
        "reviews": "(332)",
        "Website": "https://flexbook.me",
        "Phone": [
            "+1 201-484-0480"
        ],
        "Address": "314 Coles St, Jersey City, NJ 07310, United States",
        "ssl": true
    },
    {
        "Name": "New Smile Dental",
        "rating": "4.7",
        "reviews": "(99)",
        "Website": "https://www.newsmiledentalnj.com",
        "Phone": [
            "+1 973-361-4200"
        ],
        "Address": "411 US-46, Dover, NJ 07801, United States",
        "ssl": true
    },
    {
        "Name": "Luna Dental",
        "rating": "4.9",
        "reviews": "(141)",
        "Website": "https://mychart.myoryx.com",
        "Phone": [
            "+1 732-244-3444"
        ],
        "Address": "418 Hooper Ave, Toms River, NJ 08753, United States",
        "ssl": true
    },
    {
        "Name": "Riu Dental",
        "rating": "4.9",
        "reviews": "(209)",
        "Website": "https://mychart.myoryx.com",
        "Phone": [
            "+1 732-244-3444"
        ],
        "Address": "418 Hooper Ave, Toms River, NJ 08753, United States",
        "ssl": true
    },
    {
        "Name": "Jersey Smiles",
        "rating": "5.0",
        "reviews": "(364)",
        "Website": "https://jerseysmiles.com",
        "Phone": [
            "+1 732-741-4246"
        ],
        "Address": "620 Shrewsbury Ave ste a, Tinton Falls, NJ 07701, United States",
        "ssl": true
    },
    {
        "Name": "Jersey Smile Doctor",
        "rating": "4.9",
        "reviews": "(36)",
        "Website": "https://www.parsippanyprosthodontist.com",
        "Phone": [
            "+1 973-263-3006"
        ],
        "Address": "60 Baldwin Rd STE 104, Parsippany-Troy Hills, NJ 07054, United States",
        "ssl": true
    },
    {
        "Name": "Morristown Family Dental",
        "rating": "4.9",
        "reviews": "(66)",
        "Website": "https://morristownfamilydental.com",
        "Phone": [
            "+1 973-524-7702"
        ],
        "Address": "84 Maple Ave ste a, Morristown, NJ 07960, United States",
        "ssl": true
    },
    {
        "Name": "The Smile Spa of North Jersey LLC",
        "rating": "3.9",
        "reviews": "(330)",
        "Website": "https://smilespanorthjersey.com",
        "Phone": [
            "+1 973-427-1443"
        ],
        "Address": "759 Lafayette Ave Suite A, Hawthorne, NJ 07506, United States",
        "ssl": true
    },
    {
        "Name": "Dr. Dental: Dentistry & Braces",
        "rating": "4.6",
        "reviews": "(274)",
        "Website": "https://app.nexhealth.com",
        "Phone": [
            "+1 201-623-3355"
        ],
        "Address": "542 New York Ave, Lyndhurst, NJ 07071, United States",
        "ssl": true
    },
    {
        "Name": "Garden State Dental of East Brunswick",
        "rating": "4.5",
        "reviews": "(543)",
        "Website": "https://app.nexhealth.com",
        "Phone": [
            "+1 201-623-3355"
        ],
        "Address": "542 New York Ave, Lyndhurst, NJ 07071, United States",
        "ssl": true
    },
    {
        "Name": "DeFabio Dental Design",
        "rating": "5.0",
        "reviews": "(170)",
        "Website": "https://www.totalrecallsolutions.com",
        "Phone": [
            "+1 732-780-7790"
        ],
        "Address": "9 Middletown-Lincroft Rd, Lincroft, NJ 07738, United States",
        "ssl": true
    }
]

    const data = {data : test};
    const websiteUrls: string[] = data.data.map((item: { Website: any }) => item.Website);
     const parsedArray = data.data.map((row: any) => row);
      setParsedData(parsedArray);
      setLoadingMessage('Found ' + parsedArray.length + ' "' +searchQuery + '". Analyzing first 20 results...');
    await analyzeNextBatch(websiteUrls, idToken, dispatch, user, searches, setSearches, parsedArray, setLoading,activeTab, analyzedCount, setAnalyzedCount, allWebsiteUrls, setAllWebsiteUrls);
  } catch (error) {
        setLoading(false);

  } finally {
    setLoading(false);
  }
};

const analyzeNextBatch = async (websiteUrls: string[], idToken: string, dispatch: Function, user: any, searches: number, setSearches: Function, parsedData: any[], setLoading: Function, activeTab: string, analyzedCount: number, setAnalyzedCount: Function, allWebsiteUrls: string[], setAllWebsiteUrls: Function) => {
  const batchSize = 20;
  const nextBatch = websiteUrls.slice(analyzedCount, analyzedCount + batchSize);
  const nextParsedBatch = parsedData.slice(analyzedCount, analyzedCount + batchSize);
  
  await analyzeUrls(nextBatch, idToken, dispatch, user, searches, setSearches, nextParsedBatch, setLoading, activeTab);
  
  setAnalyzedCount((prevCount: number) => prevCount + nextBatch.length);
};

const analyzeUrls = async (
  dataToAnalyze: string[],
  idToken: string,
  dispatch: Function,
  user: any,
  searches: number,
  setSearches: Function,
  parsedData: any[],
  setLoading: Function,
  activeTab: string
) => {
  const apiUrl = `http://localhost:8080/api/analyzer/audit`;
  const requestData = { url: dataToAnalyze };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(`HTTP error! status: ${response.status}`);

    }

    const data = await response.json();
    console.log(data.data);
    console.log(parsedData);
    if (data && data.data && Array.isArray(data.data)) {
      let mergedData = [];
      if (activeTab !== 'url') {
        mergedData = mergeArrays(parsedData, data.data);
      } else {
        mergedData = data.data;
      }

      if (mergedData.length === 0) {
        console.warn("Merged data is empty. Using only new data.");
        dispatch(setWebsiteData(data.data));
        dispatch(setFilteredWebsiteData(data.data));
      } else {
        dispatch(setWebsiteData(mergedData));
        dispatch(setFilteredWebsiteData(mergedData));
      }
      console.log(mergedData);
      const usedCredits = data.data.length;
      const docRef = doc(db, "user-roles", user?.uid);
      await updateDoc(docRef, {
        searches: searches - usedCredits,
      });
      setSearches(searches - usedCredits);
    } else {
      console.error("Unexpected data format:", data);
          setLoading(false);

    }
  } catch (error) {
    console.error("Error:", error);
        setLoading(false);

  } finally {
    setLoading(false);
  }
};

export const handleAnalyzeMore = async (analyzedCount: number, allWebsiteUrls: string[], idToken: string, dispatch: Function, user: any, searches: number, setSearches: Function, parsedData: any[], setLoading: Function, activeTab: string, setLoadingMessage: Function, setAnalyzedCount: Function, setAllWebsiteUrls: Function) => {
  console.log(analyzedCount, allWebsiteUrls.length);
  if (analyzedCount < allWebsiteUrls.length) {
    setLoadingMessage(`Analyzing next batch (${analyzedCount + 1} to ${Math.min(analyzedCount + 20, allWebsiteUrls.length)})...`);
    await analyzeNextBatch(allWebsiteUrls, idToken, dispatch, user, searches, setSearches, parsedData, setLoading, activeTab, analyzedCount, setAnalyzedCount, allWebsiteUrls, setAllWebsiteUrls);
  }
};
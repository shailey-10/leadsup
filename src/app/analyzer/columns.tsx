"use client";

import AirplayIcon from "@mui/icons-material/Airplay";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { JSX } from "react";
import { setFilteredWebsiteData } from "../redux/filteredWebsiteData";
import store from "../redux/store";
import { customDispatch } from "./customDispatchHook";

let sortOrder = "asc";

interface ObjectType {
  [key: string]: number | string | undefined; // Replace with the actual types of your properties
}

function sortBy(property: string) {
  const state = store.getState();
  const filteredWebsiteData = state.filteredWebsiteData.filteredWebsiteData;
  const newSortOrder = sortOrder === "asc" ? "desc" : "asc";

  const sortedData = [...filteredWebsiteData].sort(
    (a: ObjectType, b: ObjectType) => {
      const aValue = Number(a[property]);
      const bValue = Number(b[property]);

      // Handle cases where the property may not exist
      if (isNaN(aValue) && isNaN(bValue)) return 0;
      if (isNaN(aValue)) return 1;
      if (isNaN(bValue)) return -1;

      // Handle "No Data" values
      if (aValue === 0 && bValue !== 0) return 1;
      if (bValue === 0 && aValue !== 0) return -1;

      // Sort based on ascending or descending order
      if (newSortOrder === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
  );

  customDispatch(setFilteredWebsiteData(sortedData));
  sortOrder = newSortOrder;
}
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export const columns: ColumnDef<any>[] = [
  { accessorKey: "Name", header: "Name" },
  {
    accessorKey: "google",
    header: "Google Ads",
    cell: ({ row }) => {
      const google: any = row.getValue("google");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {google !== "No Data" ? (
            <>
              <p>
                {google ? (
                  <CheckCircleIcon
                    sx={{
                      color: "#047a00",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: "#ff5e5e",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            "No data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "facebook",
    header: "FacebookAds",
    cell: ({ row }) => {
      const facebook: any = row.getValue("facebook");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {facebook !== "No Data" ? (
            <>
              <p>
                {facebook ? (
                  <CheckCircleIcon
                    sx={{
                      color: "#047a00",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: "#ff5e5e",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            "No data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "linkedin",
    header: "Linkedin Ads",
    cell: ({ row }) => {
      const linkedin: any = row.getValue("linkedin");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {linkedin !== "No Data" ? (
            <>
              <p>
                {linkedin ? (
                  <CheckCircleIcon
                    sx={{
                      color: "#047a00",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: "#ff5e5e",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            "No data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "twitter",
    header: "Twitter Ads",
    cell: ({ row }) => {
      const twitter: any = row.getValue("twitter");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {twitter !== "No Data" ? (
            <>
              <p>
                {twitter ? (
                  <CheckCircleIcon
                    sx={{
                      color: "#047a00",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: "#ff5e5e",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            "No data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "analytics",
    header: "Google Analytics",
    cell: ({ row }) => {
      const analytics: any = row.getValue("analytics");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {analytics !== "No Data" ? (
            <>
              <p>
                {analytics ? (
                  <CheckCircleIcon
                    sx={{
                      color: "#047a00",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: "#ff5e5e",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            "No data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "gtm",
    header: "GTM",
    cell: ({ row }) => {
      const gtm: any = row.getValue("gtm");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {gtm !== "No Data" ? (
            <>
              <p>
                {gtm ? (
                  <CheckCircleIcon
                    sx={{
                      color: "#047a00",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: "#ff5e5e",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            "No data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "ssl",
    header: "SSL",
    cell: ({ row }) => {
      const ssl: any = row.getValue("ssl");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {ssl !== "No Data" ? (
            <>
              <p>
                {ssl ? (
                  <CheckCircleIcon
                    sx={{
                      color: "#047a00",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: "#ff5e5e",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            "No data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "mailtoLinks",
    header: "Clickable Email",
    cell: ({ row }) => {
      const mailtoLinks: any = row.getValue("mailtoLinks");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {mailtoLinks !== "No Data" ? (
            <>
              <p>
                {mailtoLinks ? (
                  <CheckCircleIcon
                    sx={{
                      color: "#047a00",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: "#ff5e5e",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            "No data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "telLinks",
    header: "Clickable Phone",
    cell: ({ row }) => {
      const telLinks: any = row.getValue("telLinks");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {telLinks !== "No Data" ? (
            <>
              <p>
                {telLinks ? (
                  <CheckCircleIcon
                    sx={{
                      color: "#047a00",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: "#ff5e5e",
                      fontSize: "18px",
                      marginRight: "5px",
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            "No data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: () => {
      return (
        <button
          style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: "12px",
          }}
          onClick={() => sortBy("rating")}
        >
          <h2>Google Rating </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const rating: any = row.getValue("rating");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {rating && rating !== "No Data" ? (
            <>
              <p>{rating}</p>
            </>
          ) : (
            "No Data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "reviews",
    header: () => {
      return (
        <button
          style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: "12px",
          }}
          onClick={() => sortBy("reviews")}
        >
          <h2>No of Reviews </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const reviews: any = row.getValue("reviews");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {reviews && reviews !== "No Data" ? (
            <>
              <p>{reviews}</p>
            </>
          ) : (
            "No Data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "socialMediaLinks",
    header: "Social Media",
    cell: ({ row }) => {
      const socialMediaLinks: any = row.getValue("socialMediaLinks");
      const options = [
        "instagram.com",
        "facebook.com",
        "twitter.com",
        "yelp.com",
        "pinterest.com",
        "linkedin.com",
      ];
      function getIcon(social: string, enabled: boolean) {
        switch (social) {
          case "instagram.com":
            return (
              <InstagramIcon
                sx={{
                  color: enabled ? "#047a00" : "#8f8f8f",
                  fontSize: "18px",
                  marginRight: "5px",
                }}
              />
            );

          case "yelp.com":
            return (
              <AirplayIcon
                sx={{
                  color: enabled ? "#047a00" : "#8f8f8f",
                  fontSize: "18px",
                  marginRight: "5px",
                }}
              />
            );
          case "facebook.com":
            return (
              <FacebookIcon
                sx={{
                  color: enabled ? "#047a00" : "#8f8f8f",
                  fontSize: "18px",
                  marginRight: "5px",
                }}
              />
            );
          case "twitter.com":
            return (
              <TwitterIcon
                sx={{
                  color: enabled ? "#047a00" : "#8f8f8f",
                  fontSize: "18px",
                  marginRight: "5px",
                }}
              />
            );

          case "pinterest.com":
            return (
              <PinterestIcon
                sx={{
                  color: enabled ? "#047a00" : "#8f8f8f",
                  fontSize: "18px",
                  marginRight: "5px",
                }}
              />
            );
          case "linkedin.com":
            return (
              <LinkedInIcon
                sx={{
                  color: enabled ? "#047a00" : "#8f8f8f",
                  fontSize: "18px",
                  marginRight: "5px",
                }}
              />
            );
        }
      }
      let renderData: (JSX.Element | undefined)[] = [];
      let availableSocials: string | string[] = [];
      let unavailableSocials: string | string[] = [];
      if (socialMediaLinks && socialMediaLinks !== "No Data") {
        availableSocials = Object.keys(socialMediaLinks);
        unavailableSocials = options.filter(
          (item) => !availableSocials.includes(item)
        );
        availableSocials.map((item) => {
          renderData.push(getIcon(item, true));
        });
        unavailableSocials.map((item) => {
          renderData.push(getIcon(item, false));
        });
      }
      return (
        <div className="text-right font-medium">
          {renderData.length > 0 ? (
            <>
              {renderData.map((item) => {
                return item;
              })}
            </>
          ) : (
            "No Data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isResponsive",
    header: "Responsiveness",
    cell: ({ row }) => {
      const responsiveInfo: any = row.getValue("isResponsive");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {responsiveInfo && responsiveInfo !== "No Data" ? (
            <>
              {responsiveInfo ? (
                <CheckCircleIcon
                  sx={{
                    color: "#047a00",
                    fontSize: "18px",
                    marginRight: "5px",
                  }}
                />
              ) : (
                <CancelIcon
                  sx={{
                    color: "#ff5e5e",
                    fontSize: "18px",
                    marginRight: "5px",
                  }}
                />
              )}
            </>
          ) : (
            "No Data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "h1Count",
    header: "H1 Optimazation",
    cell: ({ row }) => {
      const headingInfo: any = row.getValue("h1Count");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {headingInfo !== "No Data" ? (
            <>
              {headingInfo ? (
                <CheckCircleIcon
                  sx={{
                    color: "#047a00",
                    fontSize: "18px",
                    marginRight: "5px",
                  }}
                />
              ) : (
                <CancelIcon
                  sx={{
                    color: "#ff5e5e",
                    fontSize: "18px",
                    marginRight: "5px",
                  }}
                />
              )}
            </>
          ) : (
            "No Data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "imageInfo",
    header: () => {
      return (
        <button
          style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: "12px",
          }}
          onClick={() => sortBy("imageInfo")}
        >
          <h2>Image Optimization </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const imageInfo: any = row.getValue("imageInfo");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {imageInfo && imageInfo !== "No Data" ? (
            <>
              <p>{Math.floor(imageInfo)}%</p>
            </>
          ) : (
            "No Data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "pageSpeed",
    header: () => {
      return (
        <button
          style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: "12px",
          }}
          onClick={() => sortBy("pageSpeed")}
        >
          <h2>Page Speed </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const pageSpeed: any = row.getValue("pageSpeed");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {pageSpeed && pageSpeed !== "No Data" ? (
            <>
              <p>{Math.floor(pageSpeed)}s</p>
            </>
          ) : (
            "No Data"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "internalLinks",
    header: () => {
      return (
        <button
          style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: "12px",
          }}
          onClick={() => sortBy("internalLinks")}
        >
          <h2>Internal Links </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },

    cell: ({ row }) => {
      const internalLinks: any = row.getValue("internalLinks");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {internalLinks}
        </div>
      );
    },
  },

  {
    accessorKey: "externalLinks",
    header: () => {
      return (
        <button
          style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: "12px",
          }}
          onClick={() => sortBy("externalLinks")}
        >
          <h2>External Links </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const externalLinks: any = row.getValue("externalLinks");
      return (
        <div style={{ textAlign: "center" }} className="text-right font-medium">
          {externalLinks}
        </div>
      );
    },
  },

  {
    accessorKey: "primaryH1",
    header: "Primary H1",
    cell: ({ row }) => {
      const headingInfo: any = row.getValue("primaryH1");
      return (
        <div className="text-right font-medium">
          {headingInfo ? (
            <>
              <p>{headingInfo ? headingInfo : "No H1 found"}</p>
            </>
          ) : (
            "No Data"
          )}
        </div>
      );
    },
  },

  { accessorKey: "metaDescriptions", header: "Meta Descriptions" },
  { accessorKey: "Website", header: "Website" },

  { accessorKey: "Phone", header: "Phone" },
  {
    accessorKey: "email",
    header: "Emails",
    cell: ({ row }) => {
      const emailInfo: any = row.getValue("email");
      return (
        <div className="text-right font-medium">
          {emailInfo && emailInfo.length > 0
            ? emailInfo.map((item: string, i: number) => {
                return <p key={i}>{item}</p>;
              })
            : "No email id found"}
        </div>
      );
    },
  },
  { accessorKey: "Address", header: "Address" }
];

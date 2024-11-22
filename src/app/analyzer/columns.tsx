'use client';

import AirplayIcon from '@mui/icons-material/Airplay';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import { ColumnDef } from '@tanstack/react-table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ArrowUpDown, Download } from 'lucide-react';
import { JSX } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM
import { setFilteredWebsiteData } from '../redux/analyzerSlice';
import { store } from '../redux/store';
import Report from '../report/page';
import { customDispatch } from './customDispatchHook';

let sortOrder = 'asc';

interface ObjectType {
  [key: string]: number | string | undefined;
}

function sortBy(property: string) {
  const state = store.getState();
  const filteredWebsiteData = state.analyzer.filteredWebsiteData;
  const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

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
      if (newSortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
  );

  customDispatch(setFilteredWebsiteData(sortedData));
  sortOrder = newSortOrder;
}

const downloadReportAsPDF = (rowData: any) => {
  const reportContainer = document.createElement('div');
  document.body.appendChild(reportContainer);

  // Render the report into the newly created div
  ReactDOM.render(<Report {...rowData} />, reportContainer);

  // Ensure that the chart is fully rendered
  const waitForChartRender = () => {
    const chart = reportContainer.querySelector('canvas'); // Adjust this selector if needed
    if (chart && chart.width > 0 && chart.height > 0) {
      return true; // Chart is rendered
    }
    return false; // Chart is not ready yet
  };

  const checkChartRendered = setInterval(() => {
    if (waitForChartRender()) {
      clearInterval(checkChartRendered);
      captureAndDownloadPDF(reportContainer);
    }
  }, 100); // Check every 100ms
};

const captureAndDownloadPDF = (reportContainer: HTMLElement) => {
  html2canvas(reportContainer, {
    allowTaint: true,
    useCORS: true,
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Calculate number of pages needed
    const pageHeight = pdf.internal.pageSize.height;
    let heightLeft = imgHeight;
    let position = 0;

    // Add images to PDF, split into pages if needed
    while (heightLeft >= 0) {
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      position -= pageHeight; // Move down for next page
      if (heightLeft >= 0) {
        pdf.addPage(); // Add a new page if there's still content left
      }
    }

    pdf.save('report.pdf');

    // Clean up the report container after PDF is downloaded
    document.body.removeChild(reportContainer);
  });
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'Download',
    header: 'Report',
    cell: ({ row }) => {
      // Access the entire row data
      const rowData: any = row.original;
      return (
        <div
          style={{ textAlign: 'center', cursor: 'pointer' }}
          className="text-right font-medium"
        >
          <Download onClick={() => downloadReportAsPDF(rowData)} />
        </div>
      );
    },
  },
  { accessorKey: 'Name', header: 'Name' },

  {
    accessorKey: 'ssl',
    header: 'SSL',
    cell: ({ row }) => {
      const ssl: any = row.getValue('ssl');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {ssl !== undefined ? (
            <>
              <p>
                {ssl ? (
                  <CheckCircleIcon
                    sx={{
                      color: '#047a00',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: '#ff5e5e',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'mailtoLinks',
    header: 'Clickable Email',
    cell: ({ row }) => {
      const mailtoLinks: any = row.getValue('mailtoLinks');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {mailtoLinks !== undefined ? (
            <>
              <p>
                {mailtoLinks ? (
                  <CheckCircleIcon
                    sx={{
                      color: '#047a00',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: '#ff5e5e',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'telLinks',
    header: 'Clickable Phone',
    cell: ({ row }) => {
      const telLinks: any = row.getValue('telLinks');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {telLinks !== undefined ? (
            <>
              <p>
                {telLinks ? (
                  <CheckCircleIcon
                    sx={{
                      color: '#047a00',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: '#ff5e5e',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'rating',
    header: () => {
      return (
        <button
          style={{
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '12px',
          }}
          onClick={() => sortBy('rating')}
        >
          <h2>Google Rating </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const rating: any = row.getValue('rating');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {rating && rating !== undefined ? (
            <>
              <p>{rating}</p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'reviews',
    header: () => {
      return (
        <button
          style={{
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '12px',
          }}
          onClick={() => sortBy('reviews')}
        >
          <h2>No of Reviews </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const reviews: any = row.getValue('reviews');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {reviews && reviews !== undefined ? (
            <>
              <p>{reviews}</p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'socialMediaLinks',
    header: 'Social Media',
    cell: ({ row }) => {
      const socialMediaLinks: any = row.original.socialMediaLinks;
      const options = [
        'instagram.com',
        'facebook.com',
        'twitter.com',
        'yelp.com',
        'pinterest.com',
        'linkedin.com',
      ];
      function getIcon(social: string, enabled: boolean) {
        switch (social) {
          case 'instagram.com':
            return (
              <InstagramIcon
                sx={{
                  color: enabled ? '#047a00' : '#8f8f8f',
                  fontSize: '18px',
                  marginRight: '5px',
                }}
              />
            );

          case 'yelp.com':
            return (
              <AirplayIcon
                sx={{
                  color: enabled ? '#047a00' : '#8f8f8f',
                  fontSize: '18px',
                  marginRight: '5px',
                }}
              />
            );
          case 'facebook.com':
            return (
              <FacebookIcon
                sx={{
                  color: enabled ? '#047a00' : '#8f8f8f',
                  fontSize: '18px',
                  marginRight: '5px',
                }}
              />
            );
          case 'twitter.com':
            return (
              <TwitterIcon
                sx={{
                  color: enabled ? '#047a00' : '#8f8f8f',
                  fontSize: '18px',
                  marginRight: '5px',
                }}
              />
            );

          case 'pinterest.com':
            return (
              <PinterestIcon
                sx={{
                  color: enabled ? '#047a00' : '#8f8f8f',
                  fontSize: '18px',
                  marginRight: '5px',
                }}
              />
            );
          case 'linkedin.com':
            return (
              <LinkedInIcon
                sx={{
                  color: enabled ? '#047a00' : '#8f8f8f',
                  fontSize: '18px',
                  marginRight: '5px',
                }}
              />
            );
        }
      }
      let renderData: (JSX.Element | undefined)[] = [];
      if (socialMediaLinks && socialMediaLinks !== undefined) {
        const { available, unavailable } = options.reduce(
          (acc: any, option) => {
            const foundLink = socialMediaLinks.find((link: any) =>
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

        availableSocials.map((item: string) => {
          renderData.push(getIcon(item, true));
        });
        unavailableSocials.map((item: string) => {
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
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'isResponsive',
    header: 'Responsiveness',
    cell: ({ row }) => {
      const responsiveInfo: any = row.getValue('isResponsive');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {responsiveInfo && responsiveInfo !== undefined ? (
            <>
              {responsiveInfo ? (
                <CheckCircleIcon
                  sx={{
                    color: '#047a00',
                    fontSize: '18px',
                    marginRight: '5px',
                  }}
                />
              ) : (
                <CancelIcon
                  sx={{
                    color: '#ff5e5e',
                    fontSize: '18px',
                    marginRight: '5px',
                  }}
                />
              )}
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'metaDescriptions',
    header: 'Description Optm',
    cell: ({ row }) => {
      const metaDescriptions: any = row.getValue('metaDescriptions');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {metaDescriptions !== undefined ? (
            <>
              {metaDescriptions.length <= 160 && metaDescriptions.length > 0 ? (
                <CheckCircleIcon
                  sx={{
                    color: '#047a00',
                    fontSize: '18px',
                    marginRight: '5px',
                  }}
                />
              ) : (
                <CancelIcon
                  sx={{
                    color: '#ff5e5e',
                    fontSize: '18px',
                    marginRight: '5px',
                  }}
                />
              )}
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'metaTitle',
    header: 'Title Optm',
    cell: ({ row }) => {
      const metaTitle: any = row.getValue('metaTitle');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {metaTitle && metaTitle !== undefined ? (
            <>
              {metaTitle.length <= 60 ? (
                <CheckCircleIcon
                  sx={{
                    color: '#047a00',
                    fontSize: '18px',
                    marginRight: '5px',
                  }}
                />
              ) : (
                <CancelIcon
                  sx={{
                    color: '#ff5e5e',
                    fontSize: '18px',
                    marginRight: '5px',
                  }}
                />
              )}
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'h1Count',
    header: 'H1 Optimazation',
    cell: ({ row }) => {
      const headingInfo: any = row.getValue('h1Count');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {headingInfo !== undefined ? (
            <>
              {Number(headingInfo) === 1 ? (
                <CheckCircleIcon
                  sx={{
                    color: '#047a00',
                    fontSize: '18px',
                    marginRight: '5px',
                  }}
                />
              ) : (
                <CancelIcon
                  sx={{
                    color: '#ff5e5e',
                    fontSize: '18px',
                    marginRight: '5px',
                  }}
                />
              )}
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'imageInfo',
    header: () => {
      return (
        <button
          style={{
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '12px',
          }}
          onClick={() => sortBy('imageInfo')}
        >
          <h2>Image Optimization </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const imageInfo: any = row.getValue('imageInfo');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {imageInfo && imageInfo !== undefined ? (
            <>
              <p>{Math.floor(imageInfo)}%</p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'pageSpeed',
    header: () => {
      return (
        <button
          style={{
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '12px',
          }}
          onClick={() => sortBy('pageSpeed')}
        >
          <h2>Page Speed </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const pageSpeed: any = row.getValue('pageSpeed');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {pageSpeed && pageSpeed !== undefined ? (
            <>
              <p>{Math.ceil(pageSpeed)}s</p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'google',
    header: 'Google Pixel',
    cell: ({ row }) => {
      const google: any = row.getValue('google');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {google !== undefined ? (
            <>
              <p>
                {google ? (
                  <CheckCircleIcon
                    sx={{
                      color: '#047a00',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: '#ff5e5e',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'facebook',
    header: 'Facebook Pixel',
    cell: ({ row }) => {
      const facebook: any = row.getValue('facebook');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {facebook !== undefined ? (
            <>
              <p>
                {facebook ? (
                  <CheckCircleIcon
                    sx={{
                      color: '#047a00',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: '#ff5e5e',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'linkedin',
    header: 'Linkedin Pixel',
    cell: ({ row }) => {
      const linkedin: any = row.getValue('linkedin');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {linkedin !== undefined ? (
            <>
              <p>
                {linkedin ? (
                  <CheckCircleIcon
                    sx={{
                      color: '#047a00',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: '#ff5e5e',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'twitter',
    header: 'Twitter Pixel',
    cell: ({ row }) => {
      const twitter: any = row.getValue('twitter');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {twitter !== undefined ? (
            <>
              <p>
                {twitter ? (
                  <CheckCircleIcon
                    sx={{
                      color: '#047a00',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: '#ff5e5e',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'analytics',
    header: 'Google Analytics',
    cell: ({ row }) => {
      const analytics: any = row.getValue('analytics');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {analytics !== undefined ? (
            <>
              <p>
                {analytics ? (
                  <CheckCircleIcon
                    sx={{
                      color: '#047a00',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: '#ff5e5e',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'gtm',
    header: 'GTM',
    cell: ({ row }) => {
      const gtm: any = row.getValue('gtm');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {gtm !== undefined ? (
            <>
              <p>
                {gtm ? (
                  <CheckCircleIcon
                    sx={{
                      color: '#047a00',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                ) : (
                  <CancelIcon
                    sx={{
                      color: '#ff5e5e',
                      fontSize: '18px',
                      marginRight: '5px',
                    }}
                  />
                )}
              </p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'internalLinks',
    header: () => {
      return (
        <button
          style={{
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '12px',
          }}
          onClick={() => sortBy('internalLinks')}
        >
          <h2>Internal Links </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },

    cell: ({ row }) => {
      const internalLinks: any = row.getValue('internalLinks');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {internalLinks !== undefined ? internalLinks : 'Too slow'}
        </div>
      );
    },
  },

  {
    accessorKey: 'externalLinks',
    header: () => {
      return (
        <button
          style={{
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '12px',
          }}
          onClick={() => sortBy('externalLinks')}
        >
          <h2>External Links </h2>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const externalLinks: any = row.getValue('externalLinks');
      return (
        <div style={{ textAlign: 'center' }} className="text-right font-medium">
          {externalLinks !== undefined ? externalLinks : 'Too slow'}
        </div>
      );
    },
  },

  {
    accessorKey: 'primaryH1',
    header: 'Primary H1',
    cell: ({ row }) => {
      const headingInfo: any = row.getValue('primaryH1');
      return (
        <div className="text-right font-medium">
          {headingInfo !== undefined ? (
            <>
              <p>{headingInfo ? headingInfo : 'No H1 found'}</p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },

  {
    accessorKey: 'metaDescriptions',
    header: 'Meta Descriptions',
    cell: ({ row }) => {
      const metaDesc: any = row.getValue('metaDescriptions');
      return (
        <div className="text-right font-medium">
          {metaDesc !== undefined ? (
            <>
              <p>{metaDesc ? metaDesc : 'No meta description'}</p>
            </>
          ) : (
            'Too slow'
          )}
        </div>
      );
    },
  },
  { accessorKey: 'url', header: 'Website' },

  {
    accessorKey: 'Phone',
    header: 'Phone',
    cell: ({ row }) => {
      const phoneInfo: any = row.getValue('Phone');
      return (
        <div
          style={{ display: 'flex', gap: '20px' }}
          className="text-right font-medium"
        >
          {phoneInfo && phoneInfo.length > 0
            ? phoneInfo.map((item: string, i: number) => {
                return <p key={i}>{item.replace('tel:', '')},</p>;
              })
            : phoneInfo !== undefined
            ? 'No Phone found'
            : 'Too slow'}
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Emails',
    cell: ({ row }) => {
      const emailInfo: any = row.getValue('email');
      return (
        <div className="text-right font-medium">
          {emailInfo && emailInfo.length > 0
            ? emailInfo.map((item: string, i: number) => {
                return <p key={i}>{item.replace('mailto:', '')}</p>;
              })
            : emailInfo !== undefined
            ? 'No Email found'
            : 'Too slow'}
        </div>
      );
    },
  },
  { accessorKey: 'Address', header: 'Address' },
];

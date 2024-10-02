'use client';
import { UserAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { columns } from '../analyzer/columns';
import { DataTable } from '../analyzer/data-table';
import { test } from '../constants/dummdata/dummyData';
import LeftPanel from '../home/components/LeftPanel';
import QueryBuilder from './queryBuilder';

const DemoData = () => {
  const [websiteDate, setWebsiteData] = useState(test);
  const [selectedFilter, setSelectedFilter] = useState<any>([
    { filter: '', value: '' },
  ]);
  const { user } = UserAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user || !user?.displayName) {
      router.push('/signup');
    }
  }, [router, user]);
  return (
    <div style={{ display: 'flex' }}>
      <LeftPanel />
      <div
        style={{
          padding: '60px',
          width: '80%',
          flex: 1,
          backgroundColor: '#f9f9f9',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 500,
            color: '#333333',
            marginBottom: '12px',
          }}
        >
          Demo Search
        </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '52px',
          }}
        >
          <iframe
            src="https://player.vimeo.com/video/1015170434?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479?title=0&byline=0&portrait=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            title="Leads Lyfter - Demo"
            width="560"
            style={{ borderRadius: '10px' }}
            height="315"
            frameBorder={0}
          ></iframe>
        </div>
        <QueryBuilder
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          websiteData={test}
          setWebsiteData={setWebsiteData}
        />
        <DataTable columns={columns} data={websiteDate} />
      </div>
    </div>
  );
};

export default DemoData;

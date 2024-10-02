'use client';

import { UserAuth } from '@/context/authContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientRedirect() {
  const router = useRouter();
  const { user, role } = UserAuth();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === '/' || pathname === '/signup') {
      if (user?.displayName) {
        router.push('/home');
      }
    }
    if (pathname === 'pricing') {
      if (role === 'member') {
        router.push('/home');
      }
    }
  }, [pathname, role, router, user]);

  return null;
}

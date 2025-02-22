// components/Breadcrumbs.tsx
'use client';

import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BREADCRUMB_CONFIG } from '@/config/breadcrumbs';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const params = useParams();
  const projectId = params.id as string;
  
  const pathSegments = pathname
    .split('/')
    .filter(segment => segment !== '' && segment !== 'dashboard');
  
  const buildBreadcrumbChain = () => {
    const chain: (BreadcrumbMapping & { href: string })[] = [];
    
    if (pathSegments.includes('projects') && projectId) {
      // Add just Alpine and Ridgeline
      const mainHierarchy = ['alpine', 'ridgeline'].map(path => ({
        ...BREADCRUMB_CONFIG[path],
        href: BREADCRUMB_CONFIG[path].path
      }));
      chain.push(...mainHierarchy);
      
      // Add project
      chain.push({
        path: `projects/${projectId}`,
        label: `Project ${projectId}`,
        href: `/dashboard/frontline/projects/${projectId}`
      });
      
      // Add project section if present
      const section = pathSegments[pathSegments.length - 1];
      if (BREADCRUMB_CONFIG[section]?.isProjectSection) {
        chain.push({
          ...BREADCRUMB_CONFIG[section],
          href: `/dashboard/frontline/projects/${projectId}/${BREADCRUMB_CONFIG[section].path}`
        });
      }
    } else {
      // Regular hierarchy handling
      const basePath = pathSegments[0];
      let current = BREADCRUMB_CONFIG[basePath];
      while (current) {
        chain.unshift({ ...current, href: current.path });
        if (current.parent) {
          current = BREADCRUMB_CONFIG[current.parent];
        } else {
          break;
        }
      }
    }
    
    return chain;
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm p-4">
      <Link 
        href="/dashboard/alpine" // Make sure this is absolute
        className="flex items-center text-gray-500 hover:text-gray-700"
      >
        <Home className="h-4 w-4" />
      </Link>

      {buildBreadcrumbChain().map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          <ChevronRight className="h-4 w-4 text-gray-500" />
          {index === buildBreadcrumbChain().length - 1 ? (
            <span className="ml-2 text-gray-900 font-medium">
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              href={breadcrumb.href} // This should now be correct with absolute paths
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
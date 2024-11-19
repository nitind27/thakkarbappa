"use client"
import { useLocale } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import { usePathname } from 'next/navigation';

// Define the type for breadcrumb items
interface BreadcrumbItem {
    label: string;
    href: string;
}

// Breadcrumbs component
const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
    const localActive = useLocale();
    const router = usePathname();

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {items.map((item, index) => {
                    // Determine if this is the last item and matches the current path
                    const isActive = `/${localActive}${item.href}` == router;

                    return (
                        <li key={index} className={`breadcrumb-item ${isActive ? 'active' : ''}`}>
                            <Link href={`/${localActive}${item.href}`} className={isActive ? 'text-dark' : ''}>
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

// TitleCard component with breadcrumbs
interface TitleCardProps {
    breadcrumbs: BreadcrumbItem[];
}

const TitleCard: React.FC<TitleCardProps> = ({ breadcrumbs }) => {
    return (
        <div className="container">
            <Breadcrumbs items={breadcrumbs} />
        </div>
    );
};

export default TitleCard;
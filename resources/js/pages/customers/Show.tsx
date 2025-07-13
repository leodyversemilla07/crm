import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    organization: string;
    job_title?: string;
    segment?: string;
    lifecycle_stage?: string;
    notes?: string;
    social_links?: string[];
}

interface CustomFieldValue {
    id: number;
    customField?: { name: string };
    value: string;
}

interface ShowProps {
    customer: Customer;
    customFieldValues?: CustomFieldValue[];
}

export default function Show({ customer, customFieldValues = [] }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Customers', href: '/customers' },
        { title: customer.name, href: `/customers/${customer.id}` },
    ];
    const safeCustomFieldValues = customFieldValues ?? [];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Customer: ${customer.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="text-2xl font-bold">{customer.name}</CardTitle>
                            <CardDescription>Customer Details & Information</CardDescription>
                        </div>
                         <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <a href={`/customers/${customer.id}/edit`} className="flex items-center gap-2">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Customer
                                </a>
                            </Button>
                            <Button asChild variant="default">
                                <a href={`/customers/${customer.id}/activities`} className="flex items-center gap-2">
                                    <History className="h-4 w-4" />
                                    Activity Log
                                </a>
                            </Button>
                            <Button asChild variant="ghost">
                                <a href="/customers">Back to List</a>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* Classification & Custom Fields */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Customer Classification</h3>
                                    <div className="mt-2 space-y-3">
                                        <div>
                                            <span className="text-sm font-medium">Segment:</span>
                                            <div className="mt-1">
                                                {customer.segment ? (
                                                    <Badge variant={customer.segment === 'customer' ? 'default' : 'secondary'}>
                                                        {customer.segment}
                                                    </Badge>
                                                ) : 'Not provided'}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium">Lifecycle Stage:</span>
                                            <div className="mt-1">
                                                {customer.lifecycle_stage ? (
                                                    <Badge variant={customer.lifecycle_stage === 'active' ? 'default' : 'secondary'}>
                                                        {customer.lifecycle_stage}
                                                    </Badge>
                                                ) : 'Not provided'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Render custom field values */}
                                {safeCustomFieldValues.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Custom Fields</h3>
                                        <div className="mt-2 space-y-2">
                                            {safeCustomFieldValues.map((cfv) => (
                                                <div key={cfv.id}>
                                                    <span className="text-sm font-medium">{cfv.customField?.name || 'Custom Field'}:</span>
                                                    <p className="text-sm text-muted-foreground">{cfv.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Organization */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Organization</h3>
                                    <div className="mt-2 space-y-2">
                                        <div>
                                            <span className="text-sm font-medium">Company:</span>
                                            <p className="text-sm text-muted-foreground">{customer.organization || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium">Job Title:</span>
                                            <p className="text-sm text-muted-foreground">{customer.job_title || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Social Links */}
                            {customer.social_links && customer.social_links.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Social Links</h3>
                                    <div className="mt-2 space-y-2">
                                        {customer.social_links.map((link: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <a href={link.startsWith('http') ? link : undefined} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">
                                                    {link}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Notes */}
                            {customer.notes && (
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                                    <div className="mt-2 rounded-lg border p-3 bg-muted/30">
                                        <p className="text-sm whitespace-pre-wrap">{customer.notes}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
// ...existing code above...

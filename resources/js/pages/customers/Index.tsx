import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface IndexProps {
    customers: Customer[];
    pagination: PaginationData;
}

export default function Index({ customers, pagination }: IndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Customers', href: '/customers' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="text-2xl font-bold">Customer Management</CardTitle>
                            <CardDescription>
                                Manage your customer relationships and track their lifecycle
                            </CardDescription>
                        </div>
                        <Button asChild>
                            <a href="/customers/create" className="flex items-center gap-2">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Customer
                            </a>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Organization</TableHead>
                                        <TableHead>Segment</TableHead>
                                        <TableHead>Lifecycle</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                                No customers found. <a href="/customers/create" className="text-primary hover:underline">Add your first customer</a>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        customers.map((customer) => (
                                            <TableRow key={customer.id}>
                                                <TableCell className="font-medium">{customer.name}</TableCell>
                                                <TableCell>{customer.email}</TableCell>
                                                <TableCell>{customer.phone || '-'}</TableCell>
                                                <TableCell>{customer.organization || '-'}</TableCell>
                                                <TableCell>
                                                    {customer.segment ? (
                                                        <Badge variant={customer.segment === 'customer' ? 'default' : 'secondary'}>
                                                            {customer.segment}
                                                        </Badge>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {customer.lifecycle_stage ? (
                                                        <Badge
                                                            variant={customer.lifecycle_stage === 'active' ? 'default' :
                                                                customer.lifecycle_stage === 'lead' ? 'secondary' : 'outline'}
                                                        >
                                                            {customer.lifecycle_stage}
                                                        </Badge>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button asChild variant="outline" size="sm">
                                                            <a href={`/customers/${customer.id}`}>View</a>
                                                        </Button>
                                                        <Button asChild variant="outline" size="sm">
                                                            <a href={`/customers/${customer.id}/edit`}>Edit</a>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                    {/* Pagination Controls in CardFooter */}
                    {pagination.last_page > 1 && (
                        <CardFooter className="justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href={pagination.current_page > 1 ? `/customers?page=${pagination.current_page - 1}` : undefined}
                                            aria-disabled={pagination.current_page === 1}
                                        />
                                    </PaginationItem>
                                    {/* Smart Page Numbers with Ellipsis */}
                                    {pagination.last_page <= 7 ? (
                                        Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(page => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href={`/customers?page=${page}`}
                                                    isActive={page === pagination.current_page}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))
                                    ) : (
                                        <>
                                            {/* First page */}
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="/customers?page=1"
                                                    isActive={pagination.current_page === 1}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            {/* Ellipsis before current range */}
                                            {pagination.current_page > 4 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}
                                            {/* Pages around current */}
                                            {Array.from({ length: 3 }, (_, i) => pagination.current_page - 1 + i)
                                                .filter(page => page > 1 && page < pagination.last_page)
                                                .map(page => (
                                                    <PaginationItem key={page}>
                                                        <PaginationLink
                                                            href={`/customers?page=${page}`}
                                                            isActive={page === pagination.current_page}
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}
                                            {/* Ellipsis after current range */}
                                            {pagination.current_page < pagination.last_page - 3 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}
                                            {/* Last page */}
                                            <PaginationItem>
                                                <PaginationLink
                                                    href={`/customers?page=${pagination.last_page}`}
                                                    isActive={pagination.current_page === pagination.last_page}
                                                >
                                                    {pagination.last_page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        </>
                                    )}
                                    <PaginationItem>
                                        <PaginationNext
                                            href={pagination.current_page < pagination.last_page ? `/customers?page=${pagination.current_page + 1}` : undefined}
                                            aria-disabled={pagination.current_page === pagination.last_page}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
};

import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

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
    [key: string]: string | number | string[] | undefined;
}

interface CustomField {
    id: number;
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required?: boolean;
    options?: string[];
}

interface CustomFieldValue {
    id: number;
    custom_field_id: number;
    value: string;
}

interface EditProps {
    customer: Customer;
    customFields?: CustomField[];
    customFieldValues?: CustomFieldValue[];
}

export default function Edit({ customer, customFields = [], customFieldValues = [] }: EditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Customers', href: '/customers' },
        { title: customer.name, href: `/customers/${customer.id}` },
        { title: 'Edit', href: `/customers/${customer.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm<Customer>({
        ...customer,
        social_links: customer.social_links || [],
    });

    const handleSocialLinkChange = (index: number, value: string) => {
        const updatedLinks = [...(data.social_links || [])];
        updatedLinks[index] = value;
        setData('social_links', updatedLinks);
    };

    const addSocialLink = () => {
        setData('social_links', [...(data.social_links || []), '']);
    };

    const removeSocialLink = (index: number) => {
        const updatedLinks = [...(data.social_links || [])];
        updatedLinks.splice(index, 1);
        setData('social_links', updatedLinks);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setData(e.target.name as keyof Customer, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/customers/${customer.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${customer.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Edit Customer</CardTitle>
                        <CardDescription>
                            Update customer information and business details for {customer.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name *</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                            required
                                        />
                                        {errors.name && <div className="text-red-600 dark:text-red-400 text-sm">{errors.name}</div>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                        />
                                        {errors.email && <div className="text-red-600 dark:text-red-400 text-sm">{errors.email}</div>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={data.phone}
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="organization">Organization</Label>
                                        <Input
                                            id="organization"
                                            name="organization"
                                            value={data.organization}
                                            onChange={handleChange}
                                            placeholder="Enter company/organization"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="job_title">Job Title</Label>
                                        <Input
                                            id="job_title"
                                            name="job_title"
                                            value={data.job_title}
                                            onChange={handleChange}
                                            placeholder="Enter job title"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="segment">Customer Segment</Label>
                                        <Select value={data.segment} onValueChange={value => setData('segment', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select customer segment" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="prospect">Prospect</SelectItem>
                                                <SelectItem value="customer">Customer</SelectItem>
                                                <SelectItem value="partner">Partner</SelectItem>
                                                <SelectItem value="vendor">Vendor</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lifecycle_stage">Lifecycle Stage</Label>
                                        <Select value={data.lifecycle_stage} onValueChange={value => setData('lifecycle_stage', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select lifecycle stage" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="lead">Lead</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                <SelectItem value="churned">Churned</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>


                            <div className="space-y-2">
                                <Label>Social Links</Label>
                                <div className="space-y-2">
                                    {(data.social_links || []).map((link, idx) => (
                                        <div key={idx} className="flex gap-2 items-center">
                                            <Input
                                                type="text"
                                                name={`social_link_${idx}`}
                                                value={link}
                                                onChange={e => handleSocialLinkChange(idx, e.target.value)}
                                                placeholder="Enter social link (URL or handle)"
                                            />
                                            <Button type="button" variant="ghost" onClick={() => removeSocialLink(idx)}>-</Button>
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" onClick={addSocialLink}>Add Social Link</Button>
                                </div>
                                {errors.social_links && <div className="text-red-600 dark:text-red-400 text-sm">{errors.social_links}</div>}
                            </div>
                            {/* Render custom fields dynamically */}
                            {customFields.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Custom Fields</h3>
                                    {customFields.map((field) => {
                                        const value = customFieldValues.find((v) => v.custom_field_id === field.id)?.value || '';
                                        return (
                                            <div key={field.id} className="space-y-2">
                                                <Label htmlFor={`custom_field_${field.id}`}>{field.name}{field.required ? ' *' : ''}</Label>
                                                {field.type === 'text' && (
                                                    <Input
                                                        id={`custom_field_${field.id}`}
                                                        name={`custom_fields[${field.id}]`}
                                                        value={data[`custom_fields.${field.id}`] || value}
                                                        onChange={handleChange}
                                                        required={field.required}
                                                    />
                                                )}
                                                {field.type === 'number' && (
                                                    <Input
                                                        id={`custom_field_${field.id}`}
                                                        name={`custom_fields[${field.id}]`}
                                                        type="number"
                                                        value={data[`custom_fields.${field.id}`] || value}
                                                        onChange={handleChange}
                                                        required={field.required}
                                                    />
                                                )}
                                                {field.type === 'date' && (
                                                    <Input
                                                        id={`custom_field_${field.id}`}
                                                        name={`custom_fields[${field.id}]`}
                                                        type="date"
                                                        value={data[`custom_fields.${field.id}`] || value}
                                                        onChange={handleChange}
                                                        required={field.required}
                                                    />
                                                )}
                                                {field.type === 'select' && (
                                                    <Select value={
                                                        (
                                                            typeof data[`custom_fields.${field.id}`] === 'string'
                                                                ? data[`custom_fields.${field.id}`]
                                                                : typeof data[`custom_fields.${field.id}`] === 'number'
                                                                    ? String(data[`custom_fields.${field.id}`])
                                                                    : (typeof value === 'string' ? value : (typeof value === 'number' ? String(value) : ''))
                                                        ) as string | undefined
                                                    } onValueChange={val => setData(`custom_fields.${field.id}`, val)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={`Select ${field.name}`} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {field.options && field.options.map((opt) => (
                                                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                                {errors[`custom_fields.${field.id}`] && <div className="text-red-600 dark:text-red-400 text-sm">{errors[`custom_fields.${field.id}`]}</div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    value={data.notes}
                                    onChange={handleChange}
                                    placeholder="Add any additional notes about this customer..."
                                    rows={4}
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t">
                                <Button type="button" variant="outline" asChild>
                                    <a href={`/customers/${customer.id}`}>Cancel</a>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Customer'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

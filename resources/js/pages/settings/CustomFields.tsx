import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface CustomField {
    id?: number;
    name: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
    options?: string[];
}

interface CustomFieldsProps {
    customFields: CustomField[];
}

export default function CustomFields({ customFields = [] }: CustomFieldsProps) {
    const [editingField, setEditingField] = React.useState<CustomField | null>(null);
    const [showForm, setShowForm] = React.useState(false);
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm<{
        name: string;
        type: string;
        required: boolean;
        options: string;
    }>({
        name: '',
        type: 'text',
        required: false,
        options: '',
    });

    const handleEdit = (field: CustomField) => {
        setEditingField(field);
        setData({
            name: field.name,
            type: field.type,
            required: field.required,
            options: field.options ? field.options.join(', ') : '',
        });
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingField(null);
        reset();
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // options stays as a string; backend should split if needed
        if (editingField && editingField.id) {
            put(`/settings/custom-fields/${editingField.id}`);
        } else {
            post('/settings/custom-fields');
        }
        setShowForm(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this custom field?')) {
            destroy(`/settings/custom-fields/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Custom Fields" />
            <div className="max-w-3xl mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Custom Fields</CardTitle>
                        <Button onClick={handleAdd}>Add Custom Field</Button>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-sm mb-6">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Required</th>
                                    <th>Options</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customFields.map(field => (
                                    <tr key={field.id}>
                                        <td>{field.name}</td>
                                        <td>{field.type}</td>
                                        <td>{field.required ? 'Yes' : 'No'}</td>
                                        <td>{field.options?.join(', ') || '-'}</td>
                                        <td>
                                            <Button size="sm" variant="outline" onClick={() => handleEdit(field)}>Edit</Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleDelete(field.id!)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {showForm && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    name="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                                <Select value={data.type} onValueChange={val => setData('type', val as CustomField['type'])}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="text">Text</SelectItem>
                                        <SelectItem value="number">Number</SelectItem>
                                        <SelectItem value="date">Date</SelectItem>
                                        <SelectItem value="select">Select</SelectItem>
                                    </SelectContent>
                                </Select>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={data.required}
                                        onChange={e => setData('required', e.target.checked)}
                                    />
                                    Required
                                </label>
                                {data.type === 'select' && (
                                    <Input
                                        name="options"
                                        value={data.options}
                                        onChange={e => setData('options', e.target.value)}
                                        placeholder="Options (comma separated)"
                                    />
                                )}
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={processing}>{editingField ? 'Update' : 'Create'}</Button>
                                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                                </div>
                                {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button as ShadButton } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';

interface Activity {
    id: number;
    type: string;
    activity_date: string;
    notes?: string;
    user: { name: string };
}

interface Customer {
    id: number;
    name: string;
}

interface Props {
    customer: Customer;
    activities: Activity[];
}

export default function Index({ customer, activities }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        type: '',
        activity_date: '',
        notes: '',
    });

    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [time, setTime] = React.useState('10:30:00');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/customers/${customer.id}/activities`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Customers', href: '/customers' }, { title: customer.name, href: `/customers/${customer.id}` }, { title: 'Activities', href: '#' }]}>
            <Head title={`Activities for ${customer.name}`} />
            <div className="flex flex-col gap-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Log New Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="type">Type</Label>
                                <Select value={data.type} onValueChange={value => setData('type', value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="call">Call</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="meeting">Meeting</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.type && <div className="text-red-600 text-sm">{errors.type}</div>}
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="date-picker" className="px-1">Date</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <ShadButton
                                                variant="outline"
                                                id="date-picker"
                                                className="w-32 justify-between font-normal"
                                            >
                                                {date ? date.toLocaleDateString() : "Select date"}
                                                <CalendarIcon />
                                            </ShadButton>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                captionLayout="dropdown"
                                                onSelect={(d: Date | undefined) => {
                                                    setDate(d);
                                                    setOpen(false);
                                                    if (d) {
                                                        // Combine with time if available
                                                        const dateStr = d.toISOString().slice(0, 10);
                                                        setData('activity_date', `${dateStr} ${time}`);
                                                    }
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="time-picker" className="px-1">Time</Label>
                                    <Input
                                        type="time"
                                        id="time-picker"
                                        step="1"
                                        value={time}
                                        onChange={e => {
                                            setTime(e.target.value);
                                            if (date) {
                                                const dateStr = date.toISOString().slice(0, 10);
                                                setData('activity_date', `${dateStr} ${e.target.value}`);
                                            }
                                        }}
                                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                </div>
                                {errors.activity_date && <div className="text-red-600 text-sm">{errors.activity_date}</div>}
                            </div>
                            <div>
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea id="notes" name="notes" value={data.notes} onChange={e => setData('notes', e.target.value)} placeholder="Add notes (optional)" rows={3} />
                                {errors.notes && <div className="text-red-600 text-sm">{errors.notes}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>{processing ? 'Logging...' : 'Log Activity'}</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Activity History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {activities.length === 0 ? (
                            <div className="text-muted-foreground">No activities logged yet.</div>
                        ) : (
                            <ul className="space-y-4">
                                {activities.map(activity => (
                                    <li key={activity.id} className="border rounded p-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</span>
                                            <span className="text-xs text-muted-foreground">{new Date(activity.activity_date).toLocaleString()}</span>
                                        </div>
                                        <div className="text-sm mt-2">{activity.notes || <span className="text-muted-foreground">No notes</span>}</div>
                                        <div className="text-xs text-muted-foreground mt-1">Logged by: {activity.user.name}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

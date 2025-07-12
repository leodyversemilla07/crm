import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon } from 'lucide-react';

interface Task {
    id: number;
    title: string;
    description?: string;
    due_date: string;
    completed: boolean;
    customer?: { id: number; name: string };
}

interface Props {
    tasks: Task[];
    customerId?: number;
}

export default function Index({ tasks, customerId }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        due_date: '',
        customer_id: customerId || '',
    });

    // Add missing state for date/time picker
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [open, setOpen] = React.useState(false);
    const [time, setTime] = React.useState('10:30:00');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tasks', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Tasks', href: '/tasks' }]}>
            <Head title="Tasks" />
            <div className="flex flex-col gap-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Task</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" value={data.title} onChange={e => setData('title', e.target.value)} required placeholder="Enter task title" />
                                {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={3} placeholder="Describe the task (optional)" />
                                {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="date-picker" className="px-1">Date</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date-picker"
                                                className="w-32 justify-between font-normal"
                                                type="button"
                                            >
                                                {date ? date.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
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
                                                        setData('due_date', `${dateStr} ${time}`);
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
                                                setData('due_date', `${dateStr} ${e.target.value}`);
                                            }
                                        }}
                                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                        placeholder="Select time"
                                    />
                                </div>
                                {errors.due_date && <div className="text-red-600 text-sm">{errors.due_date}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>{processing ? 'Creating...' : 'Create Task'}</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>My Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {tasks.length === 0 ? (
                            <div className="text-muted-foreground">No tasks found.</div>
                        ) : (
                            <ul className="space-y-4">
                                {tasks.map(task => (
                                    <li key={task.id} className="border rounded p-3 flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold">
                                                {task.title}
                                                {task.completed && <span className="ml-2 text-green-600 text-xs">(Completed)</span>}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Due: {new Date(task.due_date).toLocaleString()}</div>
                                            {task.customer && <div className="text-xs text-muted-foreground">Customer: {task.customer.name}</div>}
                                            {task.description && <div className="mt-1 text-sm">{task.description}</div>}
                                        </div>
                                        {!task.completed && (
                                            <form method="POST" action={`/tasks/${task.id}/complete`}>
                                                <Button type="submit" size="sm" variant="default">Mark Complete</Button>
                                            </form>
                                        )}
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

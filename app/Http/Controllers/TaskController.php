<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    use \Illuminate\Foundation\Auth\Access\AuthorizesRequests;
    /**
     * Display a listing of tasks for a user or customer.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $customerId = $request->query('customer_id');
        $tasks = Task::with('customer')
            ->where('user_id', $user->id)
            ->when($customerId, fn($q) => $q->where('customer_id', $customerId))
            ->orderBy('due_date')
            ->get();
        return Inertia::render('tasks/Index', [
            'tasks' => $tasks,
            'customerId' => $customerId,
        ]);
    }

    /**
     * Store a new task.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'customer_id' => 'nullable|exists:customers,id',
        ]);
        $validated['user_id'] = Auth::id();
        $validated['completed'] = false;
        $task = Task::create($validated);
        return redirect()->route('tasks.index')->with('success', 'Task created.');
    }

    /**
     * Mark a task as completed.
     */
    public function complete(Task $task)
    {
        $this->authorize('update', $task);
        $task->completed = true;
        $task->save();
        return redirect()->route('tasks.index')->with('success', 'Task marked as complete.');
    }

    // Optionally add edit, update, destroy methods here
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Activity;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;

class ActivityController extends Controller
{
    /**
     * Display a listing of activities for a customer.
     */
    public function index($customerId)
    {
        $customer = Customer::findOrFail($customerId);
        $activities = Activity::where('customer_id', $customerId)->with('user')->orderByDesc('activity_date')->get();
        return Inertia::render('activities/Index', [
            'customer' => $customer,
            'activities' => $activities,
        ]);
    }

    /**
     * Store a new activity for a customer.
     */
    public function store(Request $request, $customerId)
    {
        $customer = Customer::findOrFail($customerId);
        $validated = $request->validate([
            'type' => 'required|string|max:50',
            'activity_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);
        $validated['customer_id'] = $customerId;
        $validated['user_id'] = Auth::id();
        $activity = Activity::create($validated);
        return redirect()->route('activities.index', $customerId)->with('success', 'Activity logged.');
    }

    // Optionally add edit, update, destroy methods here
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;


class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::with('user')->paginate(15);
        return Inertia::render('customers/Index', [
            'customers' => $customers->items(),
            'pagination' => [
                'current_page' => $customers->currentPage(),
                'last_page' => $customers->lastPage(),
                'per_page' => $customers->perPage(),
                'total' => $customers->total(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('customers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:customers,email',
            'phone' => 'nullable|string|max:50',
            'organization' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'social_links' => 'nullable|array',
            'notes' => 'nullable|string',
            'segment' => 'nullable|string|max:100',
            'lifecycle_stage' => 'nullable|string|max:100',
        ]);
        $validated['user_id'] = Auth::id();
        $customer = Customer::create($validated);
        return redirect()->route('customers.show', $customer->id)->with('success', 'Customer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $customer = Customer::with('user')->findOrFail($id);
        return Inertia::render('customers/Show', [
            'customer' => $customer
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $customer = Customer::findOrFail($id);
        return Inertia::render('customers/Edit', [
            'customer' => $customer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $customer = Customer::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:customers,email,' . $customer->id,
            'phone' => 'nullable|string|max:50',
            'organization' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'social_links' => 'nullable|array',
            'notes' => 'nullable|string',
            'segment' => 'nullable|string|max:100',
            'lifecycle_stage' => 'nullable|string|max:100',
        ]);
        $customer->update($validated);
        return redirect()->route('customers.show', $customer->id)->with('success', 'Customer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();
        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully.');
    }
}

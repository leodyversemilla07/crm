<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Activity;
use App\Models\Customer;
use App\Models\User;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all customers and users
        $customers = Customer::all();
        $users = User::all();

        // For each customer, create 3-5 random activities
        foreach ($customers as $customer) {
            $user = $users->random();
            Activity::factory()
                ->count(rand(3, 5))
                ->for($customer)
                ->for($user)
                ->create();
        }
    }
}

<?php

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Activity;
use App\Models\Customer;
use App\Models\User;

class ActivityFactory extends Factory
{
    protected $model = Activity::class;

    public function definition()
    {
        return [
            'customer_id' => Customer::factory(),
            'user_id' => User::factory(),
            'type' => $this->faker->randomElement(['call', 'email', 'meeting']),
            'activity_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'notes' => $this->faker->sentence(),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'organization' => $this->faker->company(),
            'job_title' => $this->faker->jobTitle(),
            'segment' => $this->faker->randomElement(['prospect', 'customer', 'partner', 'vendor', 'other']),
            'lifecycle_stage' => $this->faker->randomElement(['lead', 'active', 'inactive', 'churned']),
            'notes' => $this->faker->sentence(),
            'social_links' => $this->faker->randomElements([
                $this->faker->url(),
                'https://twitter.com/' . $this->faker->userName(),
                'https://linkedin.com/in/' . $this->faker->userName(),
                '@' . $this->faker->userName(),
            ], $this->faker->numberBetween(1, 3)),
            'user_id' => User::factory(),
        ];
    }
}

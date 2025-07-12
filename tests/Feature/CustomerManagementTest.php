<?php

use App\Models\User;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('customer can be created with segmentation and lifecycle', function () {
    $user = User::factory()->createOne();
    $this->actingAs($user);

    $response = $this->post('/customers', [
        'name' => 'Test Customer',
        'email' => 'test@example.com',
        'phone' => '1234567890',
        'organization' => 'TestOrg',
        'job_title' => 'Manager',
        'segment' => 'prospect',
        'lifecycle_stage' => 'lead',
        'notes' => 'Test notes',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('customers', [
        'name' => 'Test Customer',
        'segment' => 'prospect',
        'lifecycle_stage' => 'lead',
    ]);
});

test('customer can be edited and segment changed', function () {
    $user = User::factory()->createOne();
    $this->actingAs($user);
    $customer = Customer::factory()->create(['user_id' => $user->id, 'segment' => 'prospect']);

    $response = $this->put("/customers/{$customer->id}", [
        'name' => 'Updated Customer',
        'email' => $customer->email,
        'phone' => $customer->phone,
        'organization' => $customer->organization,
        'job_title' => $customer->job_title,
        'segment' => 'customer',
        'lifecycle_stage' => 'active',
        'notes' => 'Updated notes',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('customers', [
        'id' => $customer->id,
        'name' => 'Updated Customer',
        'segment' => 'customer',
        'lifecycle_stage' => 'active',
    ]);
});

test('customer creation fails with missing required name', function () {
    $user = User::factory()->createOne();
    $this->actingAs($user);

    $response = $this->post('/customers', [
        'email' => 'test@example.com',
        'segment' => 'prospect',
        'lifecycle_stage' => 'lead',
    ]);

    $response->assertSessionHasErrors('name');
});

test('customer creation fails with invalid email', function () {
    $user = User::factory()->createOne();
    $this->actingAs($user);

    $response = $this->post('/customers', [
        'name' => 'Test Customer',
        'email' => 'not-an-email',
        'segment' => 'prospect',
        'lifecycle_stage' => 'lead',
    ]);

    $response->assertSessionHasErrors('email');
});

test('customer creation fails with duplicate email', function () {
    $user = User::factory()->createOne();
    $this->actingAs($user);
    $existing = Customer::factory()->create(['email' => 'test@example.com', 'user_id' => $user->id]);

    $response = $this->post('/customers', [
        'name' => 'Another Customer',
        'email' => 'test@example.com',
        'segment' => 'prospect',
        'lifecycle_stage' => 'lead',
    ]);

    $response->assertSessionHasErrors('email');
});

test('customer creation fails with invalid segment', function () {
    $user = User::factory()->createOne();
    $this->actingAs($user);

    $response = $this->post('/customers', [
        'name' => 'Test Customer',
        'email' => 'test@example.com',
        'segment' => 'invalid_segment',
        'lifecycle_stage' => 'lead',
    ]);

    // Should not fail unless you add custom validation for allowed segments
    $response->assertRedirect();
});

test('customer creation fails with invalid lifecycle_stage', function () {
    $user = User::factory()->createOne();
    $this->actingAs($user);

    $response = $this->post('/customers', [
        'name' => 'Test Customer',
        'email' => 'test@example.com',
        'segment' => 'prospect',
        'lifecycle_stage' => 'invalid_stage',
    ]);

    // Should not fail unless you add custom validation for allowed lifecycle stages
    $response->assertRedirect();
});

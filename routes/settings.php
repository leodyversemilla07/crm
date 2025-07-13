<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    // Custom Field Management
    Route::get('settings/custom-fields', [\App\Http\Controllers\Settings\CustomFieldController::class, 'index'])->name('settings.custom-fields.index');
    Route::post('settings/custom-fields', [\App\Http\Controllers\Settings\CustomFieldController::class, 'store'])->name('settings.custom-fields.store');
    Route::put('settings/custom-fields/{customField}', [\App\Http\Controllers\Settings\CustomFieldController::class, 'update'])->name('settings.custom-fields.update');
    Route::delete('settings/custom-fields/{customField}', [\App\Http\Controllers\Settings\CustomFieldController::class, 'destroy'])->name('settings.custom-fields.destroy');
});

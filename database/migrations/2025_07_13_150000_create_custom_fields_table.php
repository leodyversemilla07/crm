<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('custom_fields', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // e.g. text, number, date, select
            $table->string('entity_type'); // e.g. Customer, Task, Activity
            $table->json('options')->nullable(); // for select fields
            $table->boolean('required')->default(false);
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('custom_fields');
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'organization',
        'job_title',
        'social_links',
        'notes',
        'segment',
        'lifecycle_stage',
        'user_id',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

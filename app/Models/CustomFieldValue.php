<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomFieldValue extends Model
{
    protected $fillable = [
        'custom_field_id',
        'entity_id',
        'entity_type',
        'value',
    ];

    public function customField()
    {
        return $this->belongsTo(CustomField::class);
    }

    public function entity()
    {
        return $this->morphTo();
    }
}

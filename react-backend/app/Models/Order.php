<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'field_id', 'time_start', 'time_end'];

    // Quan hệ với User
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Quan hệ với Field
    public function field() {
        return $this->belongsTo(Field::class);
    }
}

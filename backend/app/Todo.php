<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Todo extends Model
{
    protected $fillable = ['description', 'status', 'due_date', 'notes'];

    protected $hidden = ['sheet'];

    protected $appends = ['is_overdue'];

    const PENDING = 0;
    const DONE = 1;

    public function sheet()
    {
        return $this->belongsTo('App\Sheet');
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function getIsOverdueAttribute()
    {
        $is_overdue = false;
        if ($this->due_date) {
            $is_overdue = $this->due_date <= Carbon::now();
        }

        return $this->attributes['is_overdue'] = $is_overdue;
    }
}

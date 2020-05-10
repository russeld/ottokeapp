<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Todo extends Model
{
    protected $fillable = ['description', 'status', 'due_date', 'notes'];

    protected $hidden = ['sheet'];

    protected $appends = ['is_overdue', 'is_myday'];

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
            $today = Carbon::now()->startOfDay();

            $due_date = Carbon::parse($this->due_date);
            $diff = $due_date->diffInDays($today, false);

            $is_overdue = $diff > 0;
        }
        return $this->is_overdue = $is_overdue;
    }

    public function getIsMyDayAttribute()
    {
        $is_myday = false;
        if ($this->my_day) {
            $today = Carbon::now()->startOfDay();
            $my_day = Carbon::parse($this->my_day);
            $diff = $my_day->diffInDays($today, false);

            $is_myday = $diff == 0;
        }
        return $this->is_myday = $is_myday;
    }
}

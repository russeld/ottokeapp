<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $hidden = ['sheet'];

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
}

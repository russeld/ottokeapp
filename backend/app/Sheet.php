<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Todo;

class Sheet extends Model
{
    protected $fillable = ['name', 'hide_completed'];

    protected $appends = [
        'ongoing'
    ];

    protected $hidden = [
        'client'
    ];

    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    public function todos()
    {
        $todo = $this->hasMany('App\Todo');

        if ($this->attributes['hide_completed']) {
            return $todo->where('status', Todo::PENDING);
        }

        return $todo;
    }

    public function getOngoingAttribute()
    {
        return $this->todos()->where('status', Todo::PENDING)->count();
    }
}

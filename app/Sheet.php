<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Todo;

class Sheet extends Model
{
    protected $fillable = ['name'];

    protected $appends = [
        'ongoing',
        'completed',
        'recent'
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
        return $this->hasMany('App\Todo');
    }

    public function getOngoingAttribute()
    {
        return $this->todos()->where('status', Todo::PENDING)->count();
    }

    public function getCompletedAttribute()
    {
        return $this->todos()->where('status', Todo::DONE)->count();
    }

    public function getRecentAttribute()
    {
        return $this->todos()->select('title')->first();
    }
}

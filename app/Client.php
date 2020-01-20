<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = ['uuid'];

    public function sheets()
    {
        return $this->hasMany("App\Sheet");
    }
}

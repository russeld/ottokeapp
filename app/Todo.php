<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    const PENDING = 0;
    const DONE = 1;

    public function getStatus()
    {
        return $this->status;
    }
}

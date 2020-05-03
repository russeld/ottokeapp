<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Todo;
use App\Catalog;
use App\Client;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($uuid, $sheetId)
    {
        $todos = Client::where('uuid', $uuid)
            ->firstOrFail()
            ->sheets()
            ->where('id', $sheetId)
            ->firstOrFail()
            ->todos()
            ->orderBy('id', 'desc')
            ->get();

        return $todos;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $uuid, $sheetId)
    {
        $sheet = Client::where('uuid', $uuid)
            ->firstOrFail()
            ->sheets()
            ->where('id', $sheetId)
            ->firstOrFail();

        $todo = new Todo;

        $todo->sheet()->associate($sheet);
        $todo->title = $request->title;
        $todo->status = Todo::PENDING;

        $todo->save();

        return $todo;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $todoId
     * @return \Illuminate\Http\Response
     */
    public function show($uuid, $sheetId, $todoId)
    {
        $todo = Client::where('uuid', $uuid)
            ->firstOrFail()
            ->sheets()
            ->where('id', $sheetId)
            ->firstOrFail()
            ->todos()
            ->where('id', $todoId)
            ->firstOrFail();

        return $todo;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $todoId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $uuid, $sheetId, $todoId)
    {
        $todo = Client::where('uuid', $uuid)
            ->firstOrFail()
            ->sheets()
            ->where('id', $sheetId)
            ->firstOrFail()
            ->todos()
            ->where('id', $todoId)
            ->firstOrFail();

        $todo->fill($request->all());

        if ($todo->status == Todo::DONE)
        {
            $todo->completed_at = Carbon::now();
        }

        $todo->save();

        return $todo;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $todoId
     * @return \Illuminate\Http\Response
     */
    public function destroy($uuid, $sheetId, $todoId)
    {
        $todo = Client::where('uuid', $uuid)
            ->firstOrFail()
            ->sheets()
            ->where('id', $sheetId)
            ->firstOrFail()
            ->todos()
            ->where('id', $todoId)
            ->firstOrFail();

        $todo->delete();
    }
}

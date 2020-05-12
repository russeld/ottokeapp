<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Todo;
use App\Catalog;
use App\Client;

class TodoController extends Controller
{
    public function index(Request $request, $uuid, $sheetId)
    {
        $query = Client::where('uuid', $uuid)
            ->firstOrFail()
            ->sheets()
            ->where('id', $sheetId)
            ->firstOrFail()
            ->todos();

        $search = $request->get('search');
        if ($search) {
            $query->where('title', 'like', '%' . $request->get('search') . '%');
        }

        $todos = $query->orderBy('id', 'desc')->get();

        return $todos;
    }

    public function store(Request $request, $uuid, $sheetId)
    {
        $todo = new Todo;

        $client = Client::where('uuid', $uuid)
            ->firstOrFail();

        $sheet = $client->sheets()
            ->where('id', $sheetId)
            ->firstOrFail();

        $todo->sheet()->associate($sheet);

        $todo->title = $request->title;
        $todo->status = Todo::PENDING;
        $todo->client_id = $client->id;

        $todo->save();

        return $todo;
    }

    public function storeWithoutSheet(Request $request, $uuid)
    {
        $client = Client::where('uuid', $uuid)
            ->firstOrFail();

        $todo = new Todo;
        $todo->title = $request->title;
        $todo->status = Todo::PENDING;
        $todo->client_id = $client->id;

        $todo->save();

        return $todo;
    }

    public function getWithoutSheet(Request $request, $uuid)
    {
        $client = Client::where('uuid', $uuid)
            ->firstOrFail();

        $query = Todo::where('client_id', $client->id)
            ->whereNull('sheet_id');

        $search = $request->get('search');

        if ($search) {
            $query->where('title', 'like', '%' . $request->get('search') . '%');
        }

        $todos = $query->orderBy('id', 'desc')->get();

        return $todos;
    }

    public function show($uuid, $sheetId, $todoId)
    {
        $client = Client::where('uuid', $uuid)
            ->firstOrFail();

        $sheet = $client->sheets()
            ->where('id', $sheetId)
            ->firstOrFail();

        $todo = $sheet
            ->todos()
            ->where('id', $todoId)
            ->firstOrFail();

        return $todo;
    }

    public function update(Request $request, $uuid, $todoId)
    {
        $client = Client::where('uuid', $uuid)
            ->firstOrFail();

        $todo = Todo::where('id', $todoId)
            ->where('client_id', $client->id)
            ->firstOrFail();

        $todo->fill($request->all());

        if ($todo->status == Todo::DONE)
        {
            $todo->completed_at = Carbon::now();
        }

        $todo->save();

        return $todo;
    }

    public function destroy($uuid, $todoId)
    {
        $client = Client::where('uuid', $uuid)
            ->firstOrFail();

        $todo = Todo::where('id', $todoId)
            ->where('client_id', $client->id)
            ->firstOrFail();

        $todo->delete();
    }

    public function addToMyDay($uuid, $todoId)
    {
        $client = Client::where('uuid', $uuid)
            ->firstOrFail();

        $todo = Todo::where('client_id', $client->id)
            ->where('id', $todoId)
            ->firstOrFail();

        $todo->my_day = Carbon::now();

        $todo->save();

        return $todo;
    }

    public function getMyDay(Request $request, $uuid)
    {
        $client = Client::where('uuid', $uuid)
            ->firstOrFail();

        $query = Todo::where('client_id', $client->id)
            ->whereNotNull('my_day')
            ->whereDate('my_day', Carbon::now());

        $search = $request->get('search');

        if ($search) {
            $query->where('title', 'like', '%' . $request->get('search') . '%');
        }

        $todos = $query->orderBy('id', 'desc')->get();

        return $todos;
    }

    public function createTodoMyDay(Request $request, $uuid)
    {
        $client = Client::where('uuid', $uuid)
            ->firstOrFail();

        $todo = new Todo;
        $todo->sheet_id = null;
        $todo->my_day = Carbon::now();
        $todo->title = $request->title;
        $todo->status = Todo::PENDING;
        $todo->client_id = $client->id;
        $todo->save();

        return $todo;
    }

    public function removeFromMyDay($uuid, $todoId)
    {
        $client = Client::where('uuid', $uuid)
            ->firstOrFail();

        $todo = Todo::where('client_id', $client->id)
            ->where('id', $todoId)
            ->firstOrFail();

        $todo->my_day = null;

        $todo->save();

        return $todo;
    }
}

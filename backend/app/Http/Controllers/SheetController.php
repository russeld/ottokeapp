<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Sheet;
use App\Client;

class SheetController extends Controller
{
    public function index($uuid)
    {
        $sheets = Client::where('uuid', $uuid)->firstOrFail()->sheets()->get();

        return $sheets;
    }

    public function store(Request $request, $uuid)
    {
        $client = Client::where('uuid', $uuid)->firstOrFail();

        $sheet = new Sheet();
        $sheet->name = $request->name;
        $sheet->hide_completed = false;
        $sheet->client()->associate($client);
        $sheet->save();

        return $sheet;
    }

    public function update(Request $request, $uuid, $sheetId)
    {
        $sheet = Client::where('uuid', $uuid)
            ->firstOrFail()
            ->sheets()
            ->where('id', $sheetId)
            ->firstOrFail();

        $sheet->fill($request->all());
        $sheet->save();

        return $sheet;
    }

    public function show($uuid, $sheetId)
    {
        $sheet = Client::where('uuid', $uuid)
            ->firstOrFail()
            ->sheets()
            ->where('id', $sheetId)
            ->firstOrFail();

        return $sheet;
    }

    public function delete($uuid, $sheetId)
    {
        $sheet = Client::where('uuid', $uuid)
            ->firstOrFail()
            ->sheets()
            ->where('id', $sheetId)
            ->firstOrFail();

        $sheet->delete();
    }
}

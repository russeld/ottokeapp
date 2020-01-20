<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Client;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $clients = Client::all();
        return $clients;
    }

    public function store(Request $request)
    {
        $client = Client::firstOrCreate(['uuid' => $request->uuid]);
        return $client;
    }
}

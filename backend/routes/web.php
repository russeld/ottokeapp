<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->prefix('clients')->group(function() {
    $router->get('/', 'ClientController@index')->name('client-api-index');
    $router->post('/', 'ClientController@store')->name('client-api-store');

    $router->prefix('{uuid}/sheets')->group(function() {
        $router->get('/', 'SheetController@index')->name('sheet-api-list');
        $router->get('/{sheetId}', 'SheetController@show')->name('sheet-api-show');
        $router->post('/', 'SheetController@store')->name('sheet-api-store');
        $router->put('/{sheetId}', 'SheetController@update')->name('sheet-api-update');
        $router->delete('/{sheetId}', 'SheetController@delete')->name('sheet-api-delete');
    });

    $router->prefix('{uuid}/sheets/{sheetId}/todos')->group(function() {
        $router->get('/', 'TodoController@index')->name('todo-api-index');
        $router->post('/', 'TodoController@store')->name('todo-api-store');
        $router->get('/{todoId}', 'TodoController@show')->name('todo-api-show');
        $router->put('/{todoId}', 'TodoController@update')->name('todo-api-update');
        $router->delete('/{todoId}', 'TodoController@destroy')->name('todo-api-delete');
    });
});


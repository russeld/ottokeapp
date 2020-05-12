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

$router->group(['prefix' => 'clients'], function() use ($router) {
    $router->get('/', ['uses' => 'ClientController@index']);
    $router->post('/',['uses' => 'ClientController@store']);
    $router->get('/{uuid}/day', ['uses' => 'TodoController@getMyDay']);
    $router->post('/{uuid}/day', ['uses' => 'TodoController@createTodoMyDay']);
    $router->put('/{uuid}/day/{todoId}', ['uses' => 'TodoController@addToMyDay']);
    $router->delete('/{uuid}/day/{todoId}', ['uses' => 'TodoController@removeFromMyDay']);
    $router->post('/{uuid}/todos', ['uses' => 'TodoController@storeWithoutSheet']);
    $router->get('/{uuid}/todos', ['uses' => 'TodoController@getWithoutSheet']);
    $router->delete('/{uuid}/todos/{todoId}', ['uses' => 'TodoController@destroy']);
    $router->put('{uuid}/todos/{todoId}', ['uses' => 'TodoController@update']);

    $router->group(['prefix' => '{uuid}/sheets'], function() use ($router) {
        $router->get('/', ['uses' => 'SheetController@index']);
        $router->get('/{sheetId}', ['uses' => 'SheetController@show']);
        $router->post('/', ['uses' => 'SheetController@store']);
        $router->put('/{sheetId}', ['uses' => 'SheetController@update']);
        $router->delete('/{sheetId}', ['uses' => 'SheetController@delete']);
    });

    $router->group(['prefix' => '{uuid}/sheets/{sheetId}/todos'], function() use ($router) {
        $router->get('/', ['uses' => 'TodoController@index']);
        $router->post('/', ['uses' => 'TodoController@store']);
        $router->get('/{todoId}', ['uses' => 'TodoController@show']);
    });
});


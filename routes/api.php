<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('todos')->group(function() {
    Route::get('/', 'TodoController@index')->name('todo-api-index');
    Route::post('/', 'TodoController@store')->name('todo-api-store');
    Route::post('/{id}', 'TodoController@show')->name('todo-api-show');
    Route::put('/{id}/done', 'TodoController@update')->name('todo-api-update');
    Route::delete('/{id}', 'TodoController@destroy')->name('todo-api-delete');
});

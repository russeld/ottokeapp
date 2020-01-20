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

Route::prefix('clients')->group(function() {
    Route::get('/', 'ClientController@index')->name('client-api-index');
    Route::post('/', 'ClientController@store')->name('client-api-store');

    Route::prefix('{uuid}/sheets')->group(function() {
        Route::get('/', 'SheetController@index')->name('sheet-api-list');
        Route::get('/{sheetId}', 'SheetController@show')->name('sheet-api-show');
        Route::post('/', 'SheetController@store')->name('sheet-api-store');
        Route::put('/{sheetId}', 'SheetController@update')->name('sheet-api-update');
        Route::delete('/{sheetId}', 'SheetController@delete')->name('sheet-api-delete');
    });

    Route::prefix('{uuid}/sheets/{sheetId}/todos')->group(function() {
        Route::get('/', 'TodoController@index')->name('todo-api-index');
        Route::post('/', 'TodoController@store')->name('todo-api-store');
        Route::get('/{todoId}', 'TodoController@show')->name('todo-api-show');
        Route::put('/{todoId}', 'TodoController@update')->name('todo-api-update');
        Route::delete('/{todoId}', 'TodoController@destroy')->name('todo-api-delete');
    });
});

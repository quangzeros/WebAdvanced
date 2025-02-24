<?php

namespace App\Http\Controllers;

use App\Models\Field;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use function Laravel\Prompts\error;

class FieldController extends Controller implements HasMiddleware
{
    use AuthorizesRequests;
    public static function middleware(): array
    {
        return [
        
            new Middleware('auth:sanctum', except: ['show','index']),
        ];
    }
    

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Field::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   

        try{
            $body = $request->validate([
                'name'=>'required|max:255',
                'location'=>'required'
            ]);
    
            $field = $request->user()->fields()->create($body);
    
            return ['field'=> $field, 'user'=> $field->user];
        }catch (QueryException $e){
            return ['errors'=> $e];
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Field $field)
    {
        return ['field'=> $field, 'user'=> $field->user];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Field $field)
    {   
        $this->authorize('modify', $field);
        $body = $request->validate([
            'name'=>'required|max:255',
            'location'=>'required'
        ]);

        $field->update($body);

        return ['field'=> $field, 'user'=> $field->user];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Field $field)
    {

        $this->authorize('modify', $field);
       $field->delete();
       

       return ["message" => "Field has been deleted"];
    }
}

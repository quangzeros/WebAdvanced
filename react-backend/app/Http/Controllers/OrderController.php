<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
class OrderController extends Controller
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
        return Order::with(['user', 'field'])->latest()->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id'   => 'required|exists:users,id',
            'field_id'  => 'required|exists:fields,id',
            'time_start' => 'required|date',
            'time_end'   => 'required|date|after:time_start',
        ]);

        $order = Order::create($validated);
        return response()->json(['message' => 'Order created successfully!', 'order' => $order], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {

        $order->delete();
        
 
        return ["message" => "Field has been deleted"];
    }
}

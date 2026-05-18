<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    //
    public function conversations(){
        $conversations = Conversation::with('user')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $conversations
        ]);
    }

    // GET MESSAGES
    public function messages($id){
        $conversation = Conversation::find($id);

        if (!$conversation) {
            return response()->json([
                'success' => false,
                'message' => 'Conversation not found'
            ], 404);
        }

        $messages = Message::with('sender')
            ->where('conversation_id', $id)
            ->oldest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }

    // SEND MESSAGE
    public function send(Request $request){
        $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'message' => 'required|string'
        ]);

        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $message = Message::create([
            'conversation_id' => $request->conversation_id,
            'sender_id' => $user->id,
            'message' => $request->message
        ]);

        $message->load('sender');

        return response()->json([
            'success' => true,
            'message' => 'Message sent',
            'data' => $message
        ]);
    }

    // CREATE CONVERSATION
    public function createConversation(){
        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $conversation = Conversation::firstOrCreate([
            'user_id' => $user->id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Conversation created',
            'data' => $conversation
        ]);
    }
}

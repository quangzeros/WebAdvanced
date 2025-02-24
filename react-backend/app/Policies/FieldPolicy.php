<?php

namespace App\Policies;

use App\Models\Field;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class FieldPolicy
{


    /**
     * Determine whether the user can permanently delete the model.
     */
    public function modify(User $user, Field $field): Response
    {
        return $user->id === $field->user_id ? Response::allow() : Response::deny('You do not own this post');
    }
}

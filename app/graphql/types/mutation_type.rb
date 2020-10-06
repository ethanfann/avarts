module Types
  class MutationType < Types::BaseObject

    # Authentication
    field :login, mutation: Mutations::User::Login
    field :token_login, mutation: Mutations::User::TokenLogin
    field :logout, mutation: Mutations::User::Logout
    field :update_user, mutation: Mutations::User::UpdateUser
    field :sign_up, mutation: Mutations::User::SignUp
    field :reset_password, mutation: Mutations::User::ResetPassword
    field :send_reset_password_instructions, mutation: Mutations::User::SendResetPasswordInstructions
    field :unlock, mutation: Mutations::User::Unlock
    field :resend_unlock_instructions, mutation: Mutations::User::ResendUnlockInstructions
    field :upload, mutation: Mutations::Upload
    field :add_activity_comment, mutation: Mutations::AddActivityComment
		field :delete_activity_comment, mutation: Mutations::DeleteActivityComment
		field :update_name, mutation: Mutations::User::UpdateName
		field :update_img, mutation: Mutations::User::UpdateImg
  end
end

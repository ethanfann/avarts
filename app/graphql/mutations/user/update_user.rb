class Mutations::User::UpdateUser < GraphQL::Schema::Mutation
  null true
  description 'Update user'
  argument :password, String, required: false
  argument :passwordConfirmation, String, required: false
  payload_type Types::UserType

  def resolve(
    password: context[:current_user] ? context[:current_user].password : '',
    password_confirmation: if context[:current_user]
      context[:current_user].password_confirmation
    else
      ''
    end
  )
    user = context[:current_user]
    return nil if !user
    user.update!(
      password: password,
      password_confirmation: password_confirmation
    )
    user
  end
end

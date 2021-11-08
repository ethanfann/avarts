class Mutations::User::UpdateName < GraphQL::Schema::Mutation
  null true
  description 'Update user name'
  argument :first_name, String, required: false
  argument :last_name, String, required: false
  payload_type Types::UserType

  def resolve(first_name:, last_name:)
    user = context[:current_user]
    return nil if !user
    user.update!(first_name: first_name, last_name: last_name)
    user
  end
end

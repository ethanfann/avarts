class Mutations::User::Delete < GraphQL::Schema::Mutation
  null true
  description 'Delete a user and their data'
  payload_type Types::UserType

  def resolve()
    user = context[:current_user]

    return nil if !user
    if user.role === 'admin'
      raise GraphQL::ExecutionError,
            'Admin account deletion is not supported at this time'
    end

    user.destroy
  end
end

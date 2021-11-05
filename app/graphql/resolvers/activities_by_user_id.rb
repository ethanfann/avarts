class Resolvers::ActivitiesByUserId < GraphQL::Schema::Resolver
  argument :user_id, ID, required: true

  type [Types::ActivityType], null: true
  description 'Returns the activities belonging to the specified user_id'

  def resolve(user_id: nil)
    if context[:current_user].nil?
      raise GraphQL::ExecutionError, 'Not Authenticated'
    end

    if context[:current_user].id != user_id.to_i
      raise GraphQL::ExecutionError, 'Access Denied'
    end

    Activity.where(user_id: user_id).order('created_at DESC').includes(:user)
  end
end

class Resolvers::MyActivities < GraphQL::Schema::Resolver
  type [Types::ActivityType], null: false
  description "Returns the current user's activities"
  extras [:lookahead]

  def resolve(lookahead:)
    if context[:current_user].nil?
      raise GraphQL::ExecutionError, 'Not Authenticated'
    end

    Activity
      .where(user_id: context[:current_user].id)
      .order('created_at DESC')
      .includes(:user)
      .includes(:activity_comment)
  end
end

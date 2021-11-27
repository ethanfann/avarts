class Resolvers::MyActivities < GraphQL::Schema::Resolver
  argument :limit, Int, required: false
  argument :offset, Int, required: false

  type [Types::ActivityType], null: false
  description "Returns the current user's activities"

  def resolve(limit: 10, offset: 0)
    if context[:current_user].nil?
      raise GraphQL::ExecutionError, 'Not Authenticated'
    end

    Activity
      .where(user_id: context[:current_user].id)
      .order('created_at DESC')
      .limit(limit)
      .offset(offset)
      .includes(:user)
      .includes(:activity_comment)
  end
end

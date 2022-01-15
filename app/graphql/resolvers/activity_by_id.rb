class Resolvers::ActivityById < GraphQL::Schema::Resolver
  argument :id, ID, required: true

  type Types::ActivityType, null: false
  description "Returns the activity for a given id"

  def resolve(id: nil)
    if context[:current_user].nil?
      raise GraphQL::ExecutionError, 'Not Authenticated'
    end

    activity = Activity.find(id)

    if context[:current_user].id != activity.user_id
      raise GraphQL::ExecutionError, 'That is not yours'
    end

    activity
  end
end

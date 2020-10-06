class Resolvers::ActivitiesByUserId < GraphQL::Schema::Resolver
  argument :user_id, ID, required: true

  type [Types::ActivityType], null: true
  description 'Returns the activities belonging to the specified user_id'

  def resolve(user_id: nil)
    Activity.where(user_id: user_id).order("created_at DESC").includes(:user)
  end

end

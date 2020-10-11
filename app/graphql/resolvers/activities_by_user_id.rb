class Resolvers::ActivitiesByUserId < GraphQL::Schema::Resolver
  argument :user_id, ID, required: true

  type [Types::ActivityType], null: true
  description "Returns the activities belonging to the specified user_id"

  def resolve(user_id: nil)
    Activity.where(user_id: user_id).select(Activity.attribute_names - ["geoJson"]).order("created_at DESC").includes(:user)
  end
end

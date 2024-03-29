module Types
  class QueryType < BaseObject
    field :me, resolver: Resolvers::Me
    field :activities_by_user_id, resolver: Resolvers::ActivitiesByUserId
    field :ping, resolver: Resolvers::Ping
    field :my_activities, resolver: Resolvers::MyActivities
    field :monthly_activity, resolver: Resolvers::MonthlyActivity
    field :activity_by_id, resolver: Resolvers::ActivityById
    field :mapbox_token, resolver: Resolvers::MapboxToken
  end
end

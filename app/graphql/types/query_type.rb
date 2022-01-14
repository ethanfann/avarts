module Types
  class QueryType < BaseObject
    field :me, resolver: Resolvers::Me
    field :activities_by_user_id, resolver: Resolvers::ActivitiesByUserId
    field :ping, resolver: Resolvers::Ping
    field :my_activities, resolver: Resolvers::MyActivities
    field :monthly_activity, resolver: Resolvers::MonthlyActivity
  end
end

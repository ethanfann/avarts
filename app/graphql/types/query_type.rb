module Types
  class QueryType < BaseObject
    field :me, resolver: Resolvers::Me
    field :activities_by_user_id, resolver: Resolvers::ActivitiesByUserId
    field :ping, resolver: Resolvers::Ping
  end
end

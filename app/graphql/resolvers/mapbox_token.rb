class Resolvers::MapboxToken < GraphQL::Schema::Resolver
  type String, null: false
  description 'Retrieve the mapbox token'

  def resolve
    return '' if context[:current_user].nil?

    ENV['MAPBOX_TOKEN']
  end
end

class Resolvers::Ping < GraphQL::Schema::Resolver
  type String, null: false
  description 'Ping Pong'

  def resolve
    'Pong'
  end
end

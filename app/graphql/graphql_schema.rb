class GraphqlSchema < GraphQL::Schema
  query(Types::QueryType)
  mutation(Types::MutationType)
end

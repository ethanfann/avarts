require "graphql/rake_task"
GraphQL::RakeTask.new(schema_name: "GraphqlSchema", directory: "./frontend")
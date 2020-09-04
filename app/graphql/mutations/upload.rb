module Mutations
  class Upload < GraphQL::Schema::Mutation
    # arguments passed to the `resolve` method
    argument :title, String, required: true
    argument :description, String, required: true
    argument :geo_json, GraphQL::Types::JSON, required: true
    argument :user_id, ID, required: true

    # return type from the mutation
    type Types::ActivityType

    def resolve(title: nil, description: nil, geo_json: nil, user_id: nil)
      Activity.create!(
        title: title,
        description: description,
        geo_json: geo_json,
        user_id: user_id
      )
    end
  end
end
module Mutations
  class Upload < GraphQL::Schema::Mutation
    # arguments passed to the `resolve` method
    argument :title, String, required: true
    argument :description, String, required: true
    argument :fit_file, ApolloUploadServer::Upload, required: true
    argument :user_id, ID, required: true

    # return type from the mutation
    type Types::ActivityType

    def resolve(title: nil, description: nil, fit_file: nil, user_id: nil)
      callbacks = FitCallbacks.new()
      parser = RubyFit::FitParser.new(callbacks)
      parser.parse(fit_file.read)

      geo = {}
      geo[:type] = "FeatureCollection"
      geo[:features] = {
        type: "Feature",
        properties: {
          coordProps: callbacks.activities[:records],
        },
        geometry: {
          type: "LineString",
          coordinates: callbacks.activities[:records].map { |record| [record[:position_long], record[:position_lat], record[:altitude]] },
        },
      }

      Activity.create!(
        title: title,
        description: description,
        geo_json: geo.to_json,
        user_id: user_id,
      )
    end
  end
end

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
      coords_length = callbacks.activities[:records].length

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

      data_points = coords_length
      if (coords_length > 10000)
        factor = 0.0099
      elsif (coords_length > 5000)
        factor = 0.0005
      elsif (coords_length > 2500)
        factor = 0.00039
      elsif (coords_length > 1000)
        factor = 0.00009
      else
        factor = 0.00009
      end

      simplified = SimplifyRb::Simplifier.new.process(
        callbacks.activities[:records].map { |record| { x: record[:position_long], y: record[:position_lat] } },
        factor, true
      )
      distance = Distance.calculate(geo[:features][:geometry][:coordinates])
      elevation = Elevation.calculate(geo[:features][:geometry][:coordinates])
      start_time = Time.at(geo[:features][:properties][:coordProps][0][:timestamp]).to_datetime
      end_time = Time.at(geo[:features][:properties][:coordProps][coords_length - 1][:timestamp]).to_datetime
      time_delta = ((end_time - start_time) * 24 * 60 * 60).to_i

      Activity.create!(
        title: title,
        description: description,
        geo_json: geo.to_json,
        distance: distance,
        elevation: elevation,
        duration: time_delta,
        start_time: geo[:features][:properties][:coordProps][0][:timestamp],
        polyline: Polylines::Encoder.encode_points(simplified.map { |record| [record[:y], record[:x]] }),
        user_id: user_id,
      )
    end
  end
end

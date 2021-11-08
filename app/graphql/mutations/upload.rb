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
      callbacks = FitCallbacks.new
      parser = RubyFit::FitParser.new(callbacks)
      parser.parse(fit_file.read)
      coords_length = callbacks.activities[:records].length

      coordinates =
        callbacks.activities[:records].map do |record|
          [record[:position_long], record[:position_lat], record[:altitude]]
        end

      data_points = coords_length
      if (coords_length > 10_000)
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

      simplified =
        SimplifyRb::Simplifier.new.process(
          callbacks.activities[:records].map do |record|
            { x: record[:position_long], y: record[:position_lat] }
          end,
          factor,
          true
        )
      distance = Distance.calculate(coordinates)
      elevation = Elevation.calculate(coordinates)
      start_time =
        Time.at(callbacks.activities[:records][0][:timestamp]).to_datetime
      end_time =
        Time.at(callbacks.activities[:records][coords_length - 1][:timestamp])
          .to_datetime
      time_delta = ((end_time - start_time) * 24 * 60 * 60).to_i

      Activity.create!(
        title: title,
        description: description,
        distance: distance,
        elevation: elevation,
        duration: time_delta,
        start_time: callbacks.activities[:records][0][:timestamp],
        polyline:
          Polylines::Encoder.encode_points(
            simplified.map { |record| [record[:y], record[:x]] }
          ),
        user_id: user_id
      )
    end
  end
end

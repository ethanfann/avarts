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

      byebug

      coordinates =
        callbacks.activities[:records].map do |record|
          [record[:position_long], record[:position_lat], record[:altitude]]
        end

      coords_length = callbacks.activities[:records].length
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
          true,
        )
      distance = Distance.calculate(coordinates)
      elevation = Elevation.calculate(coordinates)
      start_time =
        Time.at(callbacks.activities[:records][0][:timestamp]).to_datetime
      end_time =
        Time.at(callbacks.activities[:records][coords_length - 1][:timestamp])
          .to_datetime
      time_delta = ((end_time - start_time) * 24 * 60 * 60).to_i

      polyline =
        Polylines::Encoder.encode_points(
          simplified.map { |record| [record[:y], record[:x]] },
        )

      read_image_light =
        Mapbox::StaticMap.new.download(polyline, false, '#FF7F50')
      read_image_dark =
        Mapbox::StaticMap.new.download(polyline, true, '#FF7F50')

      blob_light =
        ActiveStorage::Blob.create_and_upload!(
          io: read_image_light,
          filename: read_image_light.original_filename + '.jpg',
          content_type: read_image_light.content_type,
        )

      blob_dark =
        ActiveStorage::Blob.create_and_upload!(
          io: read_image_dark,
          filename: read_image_dark.original_filename + '.jpg',
          content_type: read_image_dark.content_type,
        )

      Activity.create!(
        title: title,
        description: description,
        distance: distance,
        elevation: elevation,
        duration: time_delta,
        start_time: callbacks.activities[:records][0][:timestamp],
        polyline: polyline,
        user_id: user_id,
        map_img_dark: blob_dark,
        map_img_light: blob_light,
        max_power: callbacks.activities[:max_power],
        max_speed: callbacks.activities[:max_speed],
        max_hr: callbacks.activities[:max_hr],
        min_hr: callbacks.activities[:min_hr],
        max_elev: callbacks.activities[:max_elev],
        min_elev: callbacks.activities[:min_elev],
        max_cadence: callbacks.activities[:max_cadence],
        avg_speed: callbacks.activities[:speed_total] / coords_length,
        avg_hr: callbacks.activities[:hr_total] / coords_length,
        avg_power: callbacks.activities[:power_total] / coords_length,
        avg_cadence: callbacks.activities[:cadence_total] / coords_length,
      )
    end
  end
end

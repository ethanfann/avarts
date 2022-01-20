require 'down'

module Mapbox
  class StaticMap
    def download(polyline, darkMode, stroke_color)
      map_type = darkMode ? 'dark-v10' : 'outdoors-v11'
      url = encode_url(polyline, map_type, stroke_color)

      Down.download(url)
    end

    private

    def encode_url(polyline, map_type, stroke_color)
      mapboxToken = ENV['MAPBOX_TOKEN']
      "https://api.mapbox.com/styles/v1/mapbox/#{map_type}/static/#{
        CGI.escape("path-4+#{stroke_color.gsub('#', '')}(#{polyline})")
      }/auto/750x300@2x?access_token=#{mapboxToken}"
    end
  end
end

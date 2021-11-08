# With help of:
# 	https://github.com/MovingGauteng/GeoJSON-Tools
# and https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
# and https://en.wikipedia.org/wiki/Haversine_formula
# and https://en.wikipedia.org/wiki/Great-circle_distance

module Distance
  def self.calculate(coords)
    earth_radius = 6378.137 # in km
    distance = 0

    i = 0
    while (i + 1) < coords.length
      x1 = coords[i]
      x2 = coords[i + 1]

      lat1 = x1[1]
      lon1 = x1[0]
      lat2 = x2[1]
      lon2 = x2[0]

      dlat = (lat2 - lat1) / 180.0 * Math::PI
      dlon = (lon2 - lon1) / 180.0 * Math::PI
      lat1 = lat1 / 180.0 * Math::PI
      lat2 = lat2 / 180.0 * Math::PI

      a =
        Math.sin(dlat / 2) * Math.sin(dlat / 2) +
          Math.sin(dlon / 2) * Math.sin(dlon / 2) * Math.cos(lat1) *
            Math.cos(lat2)
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      d = earth_radius * c

      distance = distance + d
      i = i + 1
    end

    (distance * 1000).round(2) # in m
  end
end

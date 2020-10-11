# With help of:
# 	https://github.com/MovingGauteng/GeoJSON-Tools
# and https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
# and https://en.wikipedia.org/wiki/Haversine_formula
# and https://en.wikipedia.org/wiki/Great-circle_distance

module Elevation
  def self.calculate(coords)
    elevations = coords.map { |coord| coord[2] }

    accumulator = 0
    elevations.each_with_index do |elev, index|
      previous = 0
      current = 0
      if (index === 0)
        previous = elev
      else
        previous = elevations[index - 1]
      end

      delta = previous - elev

      accumulator += delta if delta > 0
    end

    accumulator.round(2)
  end
end

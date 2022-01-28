class FitCallbacks
  def initialize()
    @activity = {
      activities: [],
      sessions: [],
      records: [],
      laps: [],
      events: [],
      device_infos: [],
      user_profiles: [],
      max_power: 0,
      max_speed: 0,
      max_hr: 0,
      min_hr: 1_000_000_000,
      max_elev: 0,
      min_elev: 1_000_000_000,
      max_cadence: 0,
      speed_total: 0,
      power_total: 0,
      hr_total: 0,
      cadence_total: 0,
    }
  end

  def on_activity(msg)
    @activity[:activities].append(msg)
  end

  def on_lap(msg)
    @activity[:laps].append(msg)
  end

  def on_session(msg)
    @activity[:sessions].append(msg)
  end

  def on_record(msg)
    cp = {}

    # Only append the point if there is a valid coordinate
    if msg['position_lat'] and msg['position_long']
      cp[:position_lat] = msg['position_lat']
      cp[:position_long] = msg['position_long']
      cp[:distance] = msg['distance'] if msg['distance']
      cp[:altitude] = msg['altitude'] if msg['altitude']
      cp[:heart_rate] = msg['heart_rate'] if msg['heart_rate']
      cp[:timestamp] = msg['timestamp']
      cp[:cadence] = msg['cadence'] if msg['cadence']
      cp[:power] = msg['power'] if msg['power']
      cp[:speed] = msg['speed'] if msg['speed']
      cp[:temperature] = msg['temperature'] if msg['temperature']

      @activity[:speed_total] += cp[:speed] if cp[:speed]

      if cp[:power]
        @activity[:max_power] = cp[:power] if cp[:power] > @activity[:max_power]

        @activity[:power_total] += cp[:power]
      end

      if cp[:heart_rate]
        @activity[:max_hr] = cp[:heart_rate] if cp[:heart_rate] >
          @activity[:max_hr]
        @activity[:min_hr] = cp[:heart_rate] if cp[:heart_rate] <
          @activity[:min_hr]

        @activity[:hr_total] += cp[:heart_rate]
      end

      if cp[:altitude]
        @activity[:max_elev] = cp[:altitude] if cp[:altitude] >
          @activity[:max_elev]
        @activity[:min_elev] = cp[:altitude] if cp[:altitude] <
          @activity[:min_elev]
      end

      if cp[:cadence]
        @activity[:max_cadence] = cp[:cadence] if cp[:cadence] >
          @activity[:max_cadence]

        @activity[:cadence_total] += cp[:cadence]
      end

      @activity[:records].append(cp)
    end
  end

  def on_event(msg)
    @activity[:events].append(msg)
  end

  def on_device_info(msg)
    @activity[:device_infos].append(msg)
  end

  def on_user_profile(msg)
    @activity[:user_profiles].append(msg)
  end

  def on_weight_scale_info(msg)
    #puts "weight scale info: #{msg.inspect}"
  end

  def print_msg(msg); end

  def activities
    return @activity
  end
end

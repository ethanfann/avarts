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
    if msg["position_lat"] and msg["position_long"]
      cp[:position_lat] = msg["position_lat"]
      cp[:position_long] = msg["position_long"]
      cp[:distance] = msg["distance"] if msg["distance"]
      cp[:altitude] = msg["altitude"] if msg["altitude"]
      cp[:heart_rate] = msg["heart_rate"] if msg["heart_rate"]
      cp[:timestamp] = msg["timestamp"]
      cp[:cadence] = msg["cadence"] if msg["cadence"]
      cp[:power] = msg["power"] if msg["power"]
      cp[:speed] = msg["speed"] if msg["speed"]
      cp[:temperature] = msg["temperature"] if msg["temperature"]

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

  def print_msg(msg)
  end

  def activities
    return @activity
  end
end

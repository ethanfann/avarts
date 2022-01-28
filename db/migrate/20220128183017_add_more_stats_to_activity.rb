class AddMoreStatsToActivity < ActiveRecord::Migration[6.1]
  def change
    add_column :activities, :max_power, :integer, default: 0
    add_column :activities, :max_speed, :integer, default: 0
    add_column :activities, :max_hr, :integer, default: 0
    add_column :activities, :min_hr, :integer, default: 0
    add_column :activities, :max_elev, :integer, default: 0
    add_column :activities, :min_elev, :integer, default: 0
    add_column :activities, :max_cadence, :integer, default: 0
    add_column :activities, :avg_speed, :integer, default: 0
    add_column :activities, :avg_power, :integer, default: 0
    add_column :activities, :avg_hr, :integer, default: 0
    add_column :activities, :avg_cadence, :integer, default: 0
  end
end

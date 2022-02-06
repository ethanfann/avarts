class AddMeasurementPreferenceToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :measurement_preference, :string, default: 'feet'
  end
end

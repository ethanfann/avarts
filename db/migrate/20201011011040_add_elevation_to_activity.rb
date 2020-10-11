class AddElevationToActivity < ActiveRecord::Migration[6.0]
  def change
    add_column :activities, :elevation, :integer, :null => false, :default => 0
  end
end

class AddDurationToActivity < ActiveRecord::Migration[6.0]
  def change
    add_column :activities, :duration, :integer, :null => false, :default => 0
  end
end

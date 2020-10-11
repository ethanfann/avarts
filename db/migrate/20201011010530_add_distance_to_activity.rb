class AddDistanceToActivity < ActiveRecord::Migration[6.0]
  def change
    add_column :activities, :distance, :integer, :null => false, :default => 0
  end
end

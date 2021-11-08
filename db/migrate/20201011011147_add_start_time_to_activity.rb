class AddStartTimeToActivity < ActiveRecord::Migration[6.0]
  def change
    add_column :activities, :start_time, :integer, null: false, default: 0
  end
end

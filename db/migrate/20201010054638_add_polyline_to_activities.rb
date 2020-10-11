class AddPolylineToActivities < ActiveRecord::Migration[6.0]
  def change
    add_column :activities, :polyline, :string, :null => false, :default => ""
  end
end

class AddUserIdToActivities < ActiveRecord::Migration[6.0]
  def change
    add_column :activities, :user_id, :integer
  end
end

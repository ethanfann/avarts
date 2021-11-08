class AddStrokeColorToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :stroke_color, :string, null: false, default: '#FF7F50'
  end
end

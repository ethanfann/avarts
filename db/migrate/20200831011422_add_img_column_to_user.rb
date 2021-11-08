class AddImgColumnToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :img, :string, default: ''
  end
end

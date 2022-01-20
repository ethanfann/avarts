class AddMapImgToActivity < ActiveRecord::Migration[6.1]
  def change
    add_column :activities, :map_img_light, :string, default: ''
    add_column :activities, :map_img_dark, :string, default: ''
  end
end

class RemoveGeoJsonFromActivity < ActiveRecord::Migration[6.1]
  def up
    remove_column :activities, :geo_json
  end

  def down
    add_column :activities, :geo_json, :json
  end
end

module Types
	class UserType < BaseModel
		include Rails.application.routes.url_helpers
    field :name, String, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :email, String, null: true
    field :token, String, null: false
    field :img, String, null:false
    field :latest_activity, ActivityType, null:true
		field :activity_count, Integer, null:true
		field :stroke_color, String, null:false

		def img
			if object.img.present?
				# rails_blob_path(object.img, only_path: true)
				object.img.url
			else
				''
			end
		end
  end
end

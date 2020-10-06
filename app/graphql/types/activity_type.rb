module Types
  class ActivityType < BaseModel
    field :title, String, null: false
    field :description, String, null: false
    field :geo_json, GraphQL::Types::JSON, null: false
		field :user_id, ID, null: false
		field :user, UserType, null: false
		field :comments, [ActivityCommentType], null: false

		def user
			object.user
		end
	end


end

module Types
  class UserType < BaseModel
    field :name, String, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :email, String, null: true
    field :token, String, null: false
    field :img, String, null:false
    field :latest_activity, ActivityType, null:true
    field :activity_count, Integer, null:true
  end
end

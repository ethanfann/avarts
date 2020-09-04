module Types
  class ActivityCommentType < BaseModel
    field :comment, String, null: false
    field :user, UserType, null:false
  end
end

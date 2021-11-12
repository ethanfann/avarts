module Types
  class ActivityType < BaseModel
    field :title, String, null: false
    field :description, String, null: false
    field :polyline, String, null: false
    field :start_time, Integer, null: false
    field :duration, Integer, null: false
    field :elevation, Integer, null: false
    field :distance, Integer, null: false
    field :user_id, ID, null: false
    field :user, UserType, null: false
    field :comments, [ActivityCommentType], null: false

    def user
      object.user
    end

    def comments
      object.activity_comment
    end
  end
end

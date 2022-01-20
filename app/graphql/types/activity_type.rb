module Types
  class ActivityType < BaseModel
    field :title, String, null: false
    field :description, String, null: false
    field :polyline, String, null: false
    field :start_time, Integer, null: false
    field :duration, Integer, null: false
    field :elevation, Integer, null: false
    field :distance, Integer, null: false
    field :user, UserType, null: false
    field :activity_comment, [ActivityCommentType], null: false
    field :map_img_light, String, null: false
    field :map_img_dark, String, null: false
    include Rails.application.routes.url_helpers

    def map_img_light
      if object.map_img_light.present?
        # Use disc storage served from rails for local development or test
        # Otherwise, serve from S3.
        if Rails.env.development? || Rails.env.test?
          blob_path = rails_blob_path(object.map_img_light, only_path: true)
          base_path = 'http://127.0.0.1:3000'
          base_path + blob_path
        else
          object.map_img_light.url
        end
      else
        ''
      end
    end

    def map_img_dark
      if object.map_img_dark.present?
        # Use disc storage served from rails for local development or test
        # Otherwise, serve from S3.
        if Rails.env.development? || Rails.env.test?
          blob_path = rails_blob_path(object.map_img_dark, only_path: true)
          base_path = 'http://127.0.0.1:3000'
          base_path + blob_path
        else
          object.map_img_dark.url
        end
      else
        ''
      end
    end


  end
end

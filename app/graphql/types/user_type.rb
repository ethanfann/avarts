module Types
  class UserType < BaseModel
    include Rails.application.routes.url_helpers
    field :name, String, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :email, String, null: true
    field :token, String, null: false
    field :img, String, null: false
    field :latest_activity, ActivityType, null: true
    field :activity_count, Integer, null: true
    field :stroke_color, String, null: false
    field :measurement_preference, String, null: false

    def img
      if object.img.present?
        # Use disc storage served from rails for local development or test
        # Otherwise, serve from Cloudfront/S3.
        if Rails.env.development? || Rails.env.test?
          blob_path = rails_blob_path(object.img, only_path: true)
          base_path = 'http://127.0.0.1:3000'
          base_path + blob_path
        else
          if ENV['CDN_HOST']
            "#{ENV['CDN_HOST']}/#{object.img.key}"
          else
            object.img.url
          end
        end
      else
        ''
      end
    end
  end
end

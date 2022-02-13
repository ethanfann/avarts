class Activity < ApplicationRecord
  belongs_to :user
  has_many :activity_comment, dependent: :destroy
  has_one_attached :map_img_light
  has_one_attached :map_img_dark
  include Rails.application.routes.url_helpers

  def map_img_light_url
    if map_img_light.present?
      # Use disc storage served from rails for local development or test
      # Otherwise, serve from S3.
      if Rails.env.development? || Rails.env.test?
        blob_path = rails_blob_path(map_img_light, only_path: true)
        base_path = 'http://127.0.0.1:3000'
        base_path + blob_path
      else
        if ENV['CDN_HOST']
          return "#{ENV['CDN_HOST']}/#{map_img_light.key}"
        else
          return map_img_light.url
        end
      end
    else
      ''
    end
  end

  def map_img_dark_url
    if map_img_dark.present?
      # Use disc storage served from rails for local development or test
      # Otherwise, serve from S3.
      if Rails.env.development? || Rails.env.test?
        blob_path = rails_blob_path(map_img_dark, only_path: true)
        base_path = 'http://127.0.0.1:3000'
        base_path + blob_path
      else
        if ENV['CDN_HOST']
          return "#{ENV['CDN_HOST']}/#{map_img_light.key}"
        else
          return map_img_light.url
        end
      end
    else
      ''
    end
  end
end

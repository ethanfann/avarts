class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  include Tokenizable
  include Rails.application.routes.url_helpers
  has_many :activities
  has_one_attached :img

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :devise,
         :validatable,
         :trackable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self

  # add new roles to the end
  enum role: %i[customer admin]

  # - RELATIONS
  # -

  # - VALIDATIONS
  validates :email, presence: true
  validates :email, length: { maximum: 255 }
  validates :email, format: { with: Regex::Email::VALIDATE }
  validates :first_name, presence: true
  validates :first_name, length: { maximum: 255 }
  validates :last_name, presence: true
  validates :last_name, length: { maximum: 255 }

  # - CALLBACKS
  after_initialize :setup_new_user, if: :new_record?

  # Send mail through activejob
  def send_devise_notification(notification, *args)
    devise_mailer.send(notification, self, *args).deliver_later
  end

  def latest_activity
    Activity.where(user_id: id).last
  end

  def activity_count
    Activity.where(user_id: id).length
  end

  # return first and lastname
  def name
    [first_name, last_name].join(' ').strip
  end

  def img_url
    if img.present?
      # Use disc storage served from rails for local development or test
      # Otherwise, serve from Cloudfront/S3.
      if Rails.env.development? || Rails.env.test?
        blob_path = rails_blob_path(img, only_path: true)
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

  private def setup_new_user
    self.role ||= :customer
  end
end

class Activity < ApplicationRecord
  belongs_to :user
  has_many :activity_comment

  def comments
    ActivityComment.where(activity_id: id)
  end
end

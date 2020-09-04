class Activity < ApplicationRecord
  belongs_to :user

  def comments 
    ActivityComment.where(activity_id: id)
  end
end

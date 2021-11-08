FactoryBot.define do
  factory :activity do
    title { 'MyString' }
    description { 'MyText' }
    geo { '' }
    user_id { 1 }
  end
end

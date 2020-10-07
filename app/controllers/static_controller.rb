class StaticController < ActionController::Base
  def frontend_index_html
    render file: 'public/index.html'
  end
end

class ApplicationController < ActionController::API
  def frontend_index_html
    render file: 'public/index.html'
  end
end

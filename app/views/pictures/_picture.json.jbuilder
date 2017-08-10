json.extract! picture, :id, :path, :created_at, :updated_at
#json.extract! picture, :path
json.url picture_url(picture, format: :json)

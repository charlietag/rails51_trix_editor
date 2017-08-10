class Picture < ApplicationRecord
  mount_uploader :path, MyuploadUploader
end

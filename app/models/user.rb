class User < ApplicationRecord
  has_many :users_groups
  has_many :groups, through: users_groups
end

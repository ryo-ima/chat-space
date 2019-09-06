# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
|text|email|null: false|

### Association
- has_many :users_groups
- has_many :groups, through: users_groups
- has_many :massages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false|

### Association
- has_many :users_groups
- has_many :users, through: users_groups
- has_many :massages


## massagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|string|image||
|user|refference|null: false, foreign_key: true|
|group|refference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|refference|null: false, foreign_key: true|
|group|refference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

class CreateUsersGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :users_groups do |t|
      t.references :groups, foreign_key: true
      t.references :users, foreign_key: true
      t.timestamps
    end
  end
end

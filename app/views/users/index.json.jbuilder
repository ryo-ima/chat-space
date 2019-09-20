# @userから一つ値をuserとして下記処理する
json.array! @users do |user| 
  # user.idをjsonでもidとして使えるように
  json.id user.id
  # user.nameをjsonでもnameとして使えるように
  json.name user.name
end
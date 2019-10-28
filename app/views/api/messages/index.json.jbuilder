json.array! @messages do |message|
  json.content    message.content
  json.image      message.image
  json.time       message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
  json.user_name  message.user.name
  json.id         message.id
  json.group_id   message.group.id
end
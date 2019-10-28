json.content    @message.content
json.user_name  @message.user.name
json.time       @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
json.group_name @message.group.name
json.image      @message.image
json.id         @message.id
json.group_id   @message.group.id
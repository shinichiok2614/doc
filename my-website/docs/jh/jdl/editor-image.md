```js
entity Person{
    name String required
    avatar ImageBlob required //mở image của person id và chọn 1 tấm, k cần danh sách
    cover ImageBlob required //cũng thế
    bio TextBlob
    phone String maxlength(12) minlength(12) //0974-187-915
    country String
    address String
    createdAt Instant required
    updateAt Instant
    dateOfBirth Instant
    isAuthor Boolean required
    //menu
    //about
    //danh sách follower
    //danh sách hình ảnh
    //danh sách followee
}
entity Department{
    name String required
    image ImageBlob
}
entity Category{
    name String required
}
enum Status{
    PENDING,
    APPROVED,
    CANCELLED
}
entity Post{
    name String required
    summary TextBlob required
    status Status required
    view Integer required
    createdAt Instant
    updateAt Instant
    approvedAt Instant
}
entity Paragraph{ //modifiedBy mặc định là admin nên chỉ cần thời gian
    content TextBlob
    modifiedAt Instant
}
entity Image {
    image ImageBlob required
    url String
    caption String
    createdAt Instant required
    updatedAt Instant
}
entity Comment{
    description TextBlob required
    createdAt Instant
    updateAt Instant
}
entity Message{
    content TextBlob required
    image ImageBlob
    createdAt Instant
}
entity Follow {
    createdAt Instant required
}
relationship OneToOne{
    Person{user} to User{person} with builtInEntity
    Paragraph{user} to User{paragraph} with builtInEntity
    Comment{user} to User{comment} with builtInEntity
    Message{user} to User{message} with builtInEntity
}
relationship ManyToOne { //tất cả xử lý trên user, khi nào cần mới gọi person, person chỉ là tt thêm thôi
    Person{department(name)} to Department
    Post{category(name)} to Category
    Post{post(login)} to User with builtInEntity
    Follow{follower(login)} to User with builtInEntity
    Follow{followee(login)} to User with builtInEntity
    Comment{post(name)} to Post
    Comment{comment(login)} to User with builtInEntity
    Message{sender(login)} to User with builtInEntity
    Message{receiver(login)} to User with builtInEntity
    Image{image(login)} to User with builtInEntity
}

dto * with mapstruct
```

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
    updateAt Instant required
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
    image ImageBlob required
    status Status required
    view Integer required
    remark TextBlob //nhận xét của admin
    createdAt Instant required
    updateAt Instant required
    approvedAt Instant
    modifiedAt Instant
}
entity Paragraph {
    image ImageBlob
    caption String
    content TextBlob
    // contentType String
    createdAt Instant required
    updatedAt Instant required
}
entity Comment{
    description TextBlob
    image ImageBlob
    createdAt Instant required
    updateAt Instant required
}
entity Message{
    content TextBlob
    image ImageBlob
    createdAt Instant required
}
entity Follow {
    createdAt Instant required
}
relationship OneToOne{
    Person{user} to User{person} with builtInEntity
}
relationship ManyToOne { //tất cả xử lý trên user, khi nào cần mới gọi person, person chỉ là tt thêm thôi
    Person{department(name)} to Department
    Post{category(name)} to Category
    Post{post(login)} to User with builtInEntity
    Paragraph{paragraph(name)} to Post
    Follow{follower(login)} to User with builtInEntity
    Follow{followee(login)} to User with builtInEntity
    Comment{post(name)} to Post
    Comment{comment(login)} to User with builtInEntity
    Message{sender(login)} to User with builtInEntity
    Message{receiver(login)} to User with builtInEntity
}

dto * with mapstruct
```

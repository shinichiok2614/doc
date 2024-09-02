Để sửa hàm getAccount trong AccountResource.java để sau khi gọi getUserWithAuthorities thì thêm thông tin về Person, bạn có thể thực hiện như sau:

Thêm phương thức trong PersonRepository để tìm Person theo User:
Giả sử PersonRepository đã có phương thức findOneByUserId(Long userId) để tìm Person theo userId. Nếu chưa có, bạn cần thêm phương thức này.

Cập nhật getAccount trong AccountResource.java:

Sau khi lấy AdminUserDTO từ getUserWithAuthorities, bạn có thể sử dụng PersonRepository để tìm Person tương ứng với User.
Sau đó, chuyển đổi Person thành PersonDTO và thêm vào AdminUserDTO.
Dưới đây là cách bạn có thể sửa hàm getAccount:

```java
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final UserService userService;
    private final PersonRepository personRepository;
    private final PersonMapper personMapper;

    public AccountResource(UserService userService, PersonRepository personRepository, PersonMapper personMapper) {
        this.userService = userService;
        this.personRepository = personRepository;
        this.personMapper = personMapper;
    }

    @GetMapping("/account")
    public AdminUserDTO getAccount() {
        return userService
            .getUserWithAuthorities()
            .map(user -> {
                AdminUserDTO adminUserDTO = new AdminUserDTO(user);
                
                // Tìm Person tương ứng với User
                Optional<Person> personOpt = personRepository.findOneByUserId(user.getId());
                personOpt.ifPresent(person -> {
                    PersonDTO personDTO = personMapper.toDto(person);
                    // Thêm thông tin Person vào AdminUserDTO
                    adminUserDTO.setPerson(personDTO);
                });
                
                return adminUserDTO;
            })
            .orElseThrow(() -> new AccountResourceException("User could not be found"));
    }
}
```
Giải thích:
PersonRepository: Được sử dụng để tìm Person theo userId.
PersonMapper: Được sử dụng để chuyển đổi Person thành PersonDTO.
AdminUserDTO: Được mở rộng để chứa thêm thông tin PersonDTO.
Nếu AdminUserDTO chưa có thuộc tính person, bạn cần bổ sung thêm thuộc tính này trong AdminUserDTO và tạo các phương thức getter và setter tương ứng.

Ví dụ cập nhật AdminUserDTO:
```java
public class AdminUserDTO {

    // Các thuộc tính khác...
    
    private PersonDTO person;

    // Constructor, getter và setter cho person

    public PersonDTO getPerson() {
        return person;
    }

    public void setPerson(PersonDTO person) {
        this.person = person;
    }
}
```
Với những cập nhật này, hàm getAccount sẽ trả về thông tin User kèm theo thông tin Person tương ứng.
1. Quay về commit gần nhất với lệnh git checkout:

Nếu bạn chỉ muốn di chuyển đến một commit cụ thể mà không thay đổi lịch sử của các commit, bạn có thể dùng lệnh git checkout với mã commit. Ví dụ:
```
git checkout <mã_commit>
```
Điều này sẽ đưa bạn đến trạng thái của commit đó, nhưng lưu ý rằng đây là trạng thái "detached HEAD", có nghĩa là bạn không đang ở trên một nhánh nào.
2. Quay về commit gần nhất và tạo một nhánh mới:

Nếu bạn muốn tạo một nhánh mới từ commit đó để tiếp tục làm việc, bạn có thể làm như sau:
```
git checkout -b <tên_nhánh_mới> <mã_commit>
```
3. Quay về commit gần nhất và reset nhánh hiện tại:

Nếu bạn muốn quay về một commit và reset nhánh hiện tại của bạn để trở về trạng thái đó, sử dụng lệnh git reset. Có hai kiểu reset chính:

    - Soft reset (giữ lại thay đổi trong working directory và staging area):
```
git reset --soft <mã_commit>
```
    - Hard reset (xoá tất cả thay đổi và đưa working directory về trạng thái của commit):
```
git reset --hard <mã_commit>
```
    - Mixed reset (giữ lại thay đổi trong working directory nhưng xoá staging area):
```
git reset --mixed <mã_commit>
```
Lưu ý: git reset --hard sẽ xóa tất cả các thay đổi chưa được commit, vì vậy hãy cẩn thận khi sử dụng lệnh này.

4. Quay về commit gần nhất với lệnh git revert:

Nếu bạn muốn tạo một commit mới để đảo ngược các thay đổi từ một commit cụ thể mà không thay đổi lịch sử commit, sử dụng lệnh git revert:
```
git revert <mã_commit>
```

5. Khi bạn ở trong trạng thái "detached HEAD", có nghĩa là bạn không đang làm việc trên một nhánh cụ thể mà chỉ đang kiểm tra trạng thái của một commit cụ thể. Trong trạng thái này, bất kỳ thay đổi nào bạn thực hiện hoặc commit đều sẽ không được lưu trên một nhánh cụ thể mà sẽ chỉ được lưu trên commit đó.
Để xử lý trạng thái detached HEAD, bạn có thể thực hiện các bước sau:

Tạo một nhánh mới từ trạng thái hiện tại:
Nếu bạn muốn lưu các thay đổi hoặc commit mới từ trạng thái detached HEAD vào một nhánh mới, bạn có thể làm như sau:

```
git checkout -b <tên_nhánh_mới>
```
Điều này sẽ tạo một nhánh mới và di chuyển bạn sang nhánh đó, giữ lại tất cả các thay đổi từ trạng thái detached HEAD.

Quay lại nhánh trước đó:
Nếu bạn chỉ muốn quay trở lại nhánh mà bạn đã làm việc trước đó, bạn có thể sử dụng lệnh git checkout với tên của nhánh đó:

```
git checkout <tên_nhánh_cũ>
```
Bỏ qua trạng thái detached HEAD và không giữ lại thay đổi:
Nếu bạn muốn rời khỏi trạng thái detached HEAD mà không giữ lại bất kỳ thay đổi nào, bạn có thể đơn giản là checkout về nhánh chính hoặc bất kỳ nhánh nào khác mà bạn đang làm việc. Ví dụ:

```
git checkout <tên_nhánh>
```
Lưu ý: Nếu bạn đã thực hiện các thay đổi trong trạng thái detached HEAD và muốn giữ lại chúng, hãy đảm bảo rằng bạn đã commit các thay đổi đó trước khi quay về một nhánh khác. Nếu không, các thay đổi đó sẽ bị mất khi bạn chuyển nhánh.
```
pwd
cd .ssh
ls
rm id_ed25519
rm id_ed25519.pub
ls
ssh-keygen -t ed25519 -C "phuonghoangit2614@gmail.com"
enter
enter
ls
nano id_ed25519.pub
```
add deploy keys



```js title="remote"
git remote remove origin
git remote -v

```
lệnh tách nhánh tại con trỏ và chuyển sang nhánh mới
```
git checkout -b dev
```
lệnh tách nhánh tại con trỏ

```
git branch dev
```
lệnh xem tất cả nhánh tại local (nhấn q để thoát khỏi chế độ xem)
```
git branch
```
lệnh xem tất cả nhánh tại remote
```
git branch -a
```
lệnh chuyển sang nhánh đã có
```
git checkout dev
```

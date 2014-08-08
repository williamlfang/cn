git add . -A           # 上传全部文件 -A
git commit -m ""       #  加上注解说明有助于日后维护:-m

git remote rm origin   # 删除历史保存
git remote add origin git@github.com:williamlfang/williamlfang.github.com.git
git push origin master

jekyll --server        # 在本地文件预览效果, 可打开: 127.0.0.1:4000
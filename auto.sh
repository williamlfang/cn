cd /home/william/cn
git add . -A
git commit -m "2014-05-13"

git remote rm origin
git remote add origin git@github.com:williamlfang/cn.git
git push origin gh-pages

jekyll --server


cd /home/william/cn
git add . -A
git commit -m "updates"

git remote rm origin
git remote add origin git@github.com:williamlfang/cn.git
git push origin gh-pages

jekyll --server



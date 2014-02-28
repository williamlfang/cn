cd /home/william/en
git add . -A
git commit -m "updates"

git remote rm origin
git remote add origin git@github.com:williamlfang/en.git
git push origin gh-pages

jekyll --server



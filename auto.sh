cd /home/william/cn
git add . -A
git commit -m "Added notes for $(date)"

git remote rm origin
git remote add origin git@github.com:williamlfang/cn.git
git pull origin ph-pages
git push origin gh-pages

jekyll --server


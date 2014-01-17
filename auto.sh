jekyll build

git add .
git commit -m 'update'
git push -u origin master &

cp _site/* ../williamlfang.github.com/cn -r

cd ../williamlfang.github.com/cn
git add .
git commit -m 'update'
git push -u origin master &



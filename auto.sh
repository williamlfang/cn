jekyll build

git add .
git commit -m 'update'
git push -u origin gh-pages &

cp _site/* ../cn -r

cd ../cn
git add .
git commit -m 'update'
git push -u origin gh-pages &

jekyll --server
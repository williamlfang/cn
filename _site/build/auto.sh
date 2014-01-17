jekyll build

git add . -A 
git commit -m 'update'
git push -u origin gh-pages &

cp _site/* ../cn -r

cd ../cn
git add . -A
git commit -m 'update'
git push -u origin gh-pages &
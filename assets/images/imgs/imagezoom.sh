## 图片压缩脚本：
for img in `find ./ -name "*.[jJ][pP][gG]"`; do  
                convert -resize 30%*30% $img $img-resized;  
                rm $img;  
                mv $img-resized $img  
                echo $img  
done  

for img in `find ./ -name "*.[pP][nN][gG]"`; do  
                convert -resize 30%*30% $img $img-resized;  
                rm $img;  
                mv $img-resized $img  
                echo $img  
done  

for img in `find ./ -name "*.[gG][iI][fF]"`; do  
                convert -resize 30%*30% $img $img-resized;  
                rm $img;  
                mv $img-resized $img  
                echo $img  
done  


for img in `find ./ -name "*.[jJ][pP][gG]"`; do  
                convert -resize 30%*30% $img $img-resized;  
                rm $img;  
                mv $img-resized $img  
                echo $img  
done  



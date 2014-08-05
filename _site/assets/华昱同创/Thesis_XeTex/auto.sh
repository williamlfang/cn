xelatex -no-pdf -quiet -time-statistics main.tex
bibtex main.bib
bibtex main.aux
xelatex -no-pdf -quiet -time-statistics main.tex
makeindex main.nlo -s nomencl.ist -o main.nls
xelatex -quiet -time-statistics main.tex

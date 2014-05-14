Rscript -e "library(knitr); knit('evei.Rnw')"

xelatex -no-pdf -quiet -time-statistics evei.tex
bibtex evei.bib
bibtex evei.aux
xelatex -no-pdf -quiet -time-statistics evei.tex
makeindex main.nlo -s nomencl.ist -o evei.nls
xelatex -quiet -time-statistics evei.tex


#+-----------------+
#|     cleanup     |
#+-----------------+
# clean:  
	rm -f core \#* *~ *.blg *.dvi *.log *.ps *.tmp *.out *.gz 
# t#exclean: clean 
	rm -f *.aux *.bbl *.lof *.lot *.toc *.xdv  *.idv 
	rm -f org.idx people.idx
# realclean:  texclean clean



Rscript -e "library(knitr); knit('rquantf.Rnw')"

xelatex -no-pdf -quiet -time-statistics *.tex
bibtex *.bib
bibtex *.aux
xelatex -no-pdf -quiet -time-statistics *.tex
makeindex main.nlo -s nomencl.ist -o *.nls
xelatex -quiet -time-statistics *.tex


#+-----------------+
#|     cleanup     |
#+-----------------+
# clean:  
	rm -f core \#* *~ *.blg *.dvi *.log *.ps *.tmp *.out *.gz 
# t#exclean: clean 
	rm -f *.aux *.bbl *.lof *.lot *.toc *.xdv  *.idv 
	rm -f org.idx people.idx
# realclean:  texclean clean



Rscript -e "library(knitr); knit('rquantf.Rnw')"

xelatex -no-pdf -quiet -time-statistics rquantf.tex
bibtex rquantf.bib
bibtex rquantf.aux
xelatex -no-pdf -quiet -time-statistics rquantf.tex
makeindex main.nlo -s nomencl.ist -o rquantf.nls
xelatex -quiet -time-statistics rquantf.tex


#+-----------------+
#|     cleanup     |
#+-----------------+
# clean:  
	rm -f core \#* *~ *.blg *.dvi *.log *.ps *.tmp *.out *.gz 
# texclean: clean 
	rm -f *.aux *.bbl *.lof *.lot *.toc *.xdv  *.idv 
	rm -f org.idx people.idx *.tex 
# realclean:  texclean clean

evince rquantf.pdf


#+-----------------+
#|     cleanup     |
#+-----------------+
# clean:  
	rm -f core \#* *~ *.blg *.dvi *.log *.ps *.tmp *.out *.gz 
# texclean: clean 
	rm -f *.aux *.bbl *.lof *.lot *.toc *.xdv  *.idv *.tex
	rm -f org.idx people.idx 
# realclean:  texclean clean



Rscript -e "library(knitr); knit('fe.Rnw')"

Rscript -e  "library(knitr); knit('chapters/chapter01.Rnw')"
Rscript -e  "library(knitr); knit('chapters/chapter02.Rnw')"
Rscript -e  "library(knitr); knit('chapters/explory-data.Rnw')"

xelatex -no-pdf -quiet -time-statistics fe.tex
bibtex fe.bib
bibtex fe.aux
xelatex -no-pdf -quiet -time-statistics fe.tex
makeindex main.nlo -s nomencl.ist -o fe.nls
xelatex -quiet -time-statistics fe.tex


#+-----------------+
#|     cleanup     |
#+-----------------+
# clean:  
	rm -f core \#* *~ *.blg *.dvi *.log *.ps *.tmp *.out *.gz 
# texclean: clean 
	rm -f *.aux *.bbl *.lof *.lot *.toc *.xdv  *.idv *.tex
	rm -f org.idx people.idx 
	rm -r figure    ## remove figure 
	rm -r cache		## remove cache
# realclean:  texclean clean


evince fe.pdf


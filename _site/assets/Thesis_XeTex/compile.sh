xelatex -no-pdf -quiet -time-statistics main.tex
bibtex main.bib
bibtex main.aux
xelatex -no-pdf -quiet -time-statistics main.tex
makeindex main.nlo -s nomencl.ist -o main.nls
xelatex -quiet -time-statistics main.tex

#+-----------------+
#|     cleanup     |
#+-----------------+
# clean:  
	rm -f core \#* *~ *.blg *.dvi *.log *.ps *.tmp *.out *.gz 
# t#exclean: clean 
	rm -f *.aux *.bbl *.lof *.lot *.toc *.xdv  *.idv  *.eoc *.nls *.nlo *.ilg
# realclean:  texclean clean

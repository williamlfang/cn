FTP_DIR=cv

all: pdf html

pdf: william_cn.pdf william_en.pdf

html: william_cn.html william_en.html

chinesecv: william_cn.pdf
englishcv: william_en.pdf

%.pdf: %.tex
	#lualatex -interaction=batchmode $<
	#lualatex -interaction=batchmode $<
	xelatex -interaction=batchmode $<
	xelatex -interaction=batchmode $<

%.html: %.pdf
	pdf2htmlEX --zoom=2 $<

upload:
	-ncftpput -f ~/.ncftp/cc.cfg $(FTP_DIR)/ *.pdf
	-ncftpput -f ~/.ncftp/cc.cfg $(FTP_DIR)/ *.tex *.sty

clean:
	rm -f *.aux *.log *.out
	rm -f *.pdf


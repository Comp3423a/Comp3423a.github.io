'use strict';

var MultiplicationTable = function() {
    this.resultBigBox = document.querySelector('.diffResults') ;

    this.tableData = [] ;
    this.highlightedPixels = [];

    this.createNewElement = function(ab, className) {

        var ab = document.createElement(ab) ;
        ab.classList.add(className) ;
        return ab;
    }

    this.distributeCells = function(table) {

        for (var lines = 1; lines < 11; lines++) {

            var createlines = this.createNewElement('tr', 'mt-trow') ;
            var tlines = [] ;

            for (var pixel = 1; pixel < 11; pixel++) {

                var generatePixel = this.createNewElement('td', 'mt-tcell');
                var resultText = lines * pixel + ' pixels colored';

                generatePixel.dataset.lines = lines ;
                generatePixel.dataset.pixel = pixel ;

                generatePixel.dataset.result = lines * pixel ;
                generatePixel.setAttribute('title', resultText) ;

                generatePixel.innerHTML = lines * pixel ;
                createlines.appendChild(generatePixel) ;

                tlines.push(generatePixel) ;
                if (pixel === lines) {
                    generatePixel.classList.add('the-square') ;
                }
            }
            this.tableData.push(tlines) ;
            table.appendChild(createlines) ;
        }
    }

    this.createTable = function() {

        var table = this.createNewElement('table', 'mt-table') ;
        table.setAttribute('pixelspacing', '0') ;
        this.distributeCells(table) ;
        return table ;
    }

    this.render = function() {

        var BigBox = document.querySelector('.mt-table-container');
        BigBox.appendChild(this.createTable()) ;
    }

    this.writeResult = function(lines, pixel) {
        this.resultBigBox.innerText = lines + ' × ' + pixel + ' = ' + lines * pixel ;
    }

    this.highlightedPixels = function(lines, pixel, ab) {

        var arrayList = this.tableData ,
            linesNumber = lines - 1 ,
            pixelNumber = pixel - 1 ,

            verticalNum = arrayList[linesNumber][0] ,
            horizontalNum = arrayList[0][pixelNumber] ;

        ab.classList.add('the-result');
        verticalNum.classList.add('the-data');
        horizontalNum.classList.add('the-data');
        for (var i = 0; i < arrayList.length; i++) {

            if (i <= linesNumber) {
                for (var j = 0; j < arrayList[i].length; j++) {

                    if (j <= pixelNumber) {
                        arrayList[i][j].classList.add('the-zone') ;

                        if (j === pixelNumber || i === linesNumber) {
                            arrayList[i][j].classList.add('the-zone-border') ;
                        }
                    }
                    this.highlightedPixels.push(arrayList[i][j]) ;
                }
            }
        }
    }

    this.dimPixels = function() {

        if (this.highlightedPixels != 0) {

            for (var i = 0 ; i < this.highlightedPixels.length; i++) {
                this.highlightedPixels[i].classList.remove('the-zone' , 'the-zone-border', 'the-result', 'the-data');
            }
        }
    }

    this.parsePixelData = function(lines , pixel , ab) {

        this.dimPixels();
        this.highlightedPixels(lines , pixel , ab) ;
    }

    this.displayResult = function(u) {
        if (u.target.nodeName.toLowerCase() === 'td') {
            var lines = u.target.dataset.lines ,
                pixel = u.target.dataset.pixel ;

            this.writeResult(lines, pixel) ;
            this.parsePixelData(lines, pixel, u.target) ;
        }
    }

    this.hideResult = function() {

        this.resultBigBox.innerText = '' ;
        this.dimPixels();
    }

    this.addEvents = function() {

        var table = document.querySelector('.theTable') ;

        table.addEventListener('mouseover', this.displayResult.bind(this)) ;
        table.addEventListener('mouseout', this.hideResult.bind(this)) ;
    }

    this.init = function() {

        this.render() ;
        table.addEvents();
    }
};

var table = new MultiplicationTable() ;

table.init();
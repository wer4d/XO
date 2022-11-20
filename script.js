//рисуем доску
var MyCanvas = document.getElementById("MyCanvas")
var ctx      = MyCanvas.getContext('2d')

MyCanvas.width ='450'
MyCanvas.height='450'

function writeCarvas () {
    
    ctx.lineWidth = 1 
    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeRect(0, 0, MyCanvas.width, MyCanvas.height)
    ctx.strokeRect(0+2, 0+2, MyCanvas.width-4, MyCanvas.height-4)
    ctx.strokeRect(MyCanvas.width/3, 0, MyCanvas.width/3, MyCanvas.height)
    ctx.strokeRect(0, MyCanvas.height/3, MyCanvas.width, MyCanvas.height/3)

}

writeCarvas ()                                  //создаем объект доска

const board = {
    
    widthCell :     3,
    heightCell:     3,
    move :          0,
    start :         false,                      //-- идет ли игра?
    activeCellX:    0,                          // переменная X для определения ячейки в массиве
    activeCellY:    0,
    activeCellX1:   0,                          // переменная Х для определения координат ячейки для рисования х/о
    activeCellY1:   0,
    arCell : [  ['null', 'null', 'null'], 
                ['null', 'null', 'null'], 
                ['null', 'null', 'null']    
            ]
  }


MyCanvas.onclick = function(event) {                                    //определяем ячейку по клику, ее номер в массиве и начала координат
    
   let Rect=MyCanvas.getBoundingClientRect()
   let xclick=event.clientX-Rect.left                                   //отнимаем от координаты Х клика отступ слева канваса, чтоб получить Х относительно канвы
   let yclick=event.clientY-Rect.top                                    //TODO не точные координаты у границ левых и верхних ячеек

    if (xclick>0 && xclick<150) {
        board.activeCellX = 0                                                                   
        board.activeCellX1 = 5                                                                            
    }

    else if (xclick>150 && xclick<300) {
        board.activeCellX = 1
        board.activeCellX1 = 155        
    }

    else if (xclick>300) {
        board.activeCellX = 2
        board.activeCellX1 = 305       
    }

    if (yclick>0 && yclick<150) {                                         
        board.activeCellY = 0                                                                     
        board.activeCellY1 = 5                                                 
    }
    
    else if (yclick>150 && yclick<300) {  
        board.activeCellY = 1
        board.activeCellY1 = 155             
    }

    else if (yclick>300) {
        board.activeCellY = 2
        board.activeCellY1 = 305                
    }

    console.log('Координаты клика :', event.clientX, event.clientY, board.activeCellX, board.activeCellY, board.arCell[board.activeCellX][board.activeCellY])

    // проверка - можно ли ходить?
    if (board.start === true) {

        // проверка на пустую ячейку
        if ( board.arCell[board.activeCellX][board.activeCellY] === 'null') {

            draw()                                                  //рисуем крестик или нолик если нет
            finishcheck()                                           //проверка на конец игры
        }  

        else console.log('сюда ходить нельзя') 
    
       if (check(board.arCell[board.activeCellX][board.activeCellY]) === true) {
            board.start = false
            console.log('Игра окончена, победили', board.arCell[board.activeCellX][board.activeCellY])
            
            if (board.move % 2 != 0) {
        
                document.getElementsByTagName('h2')[0].innerHTML = 'Игра окончена, победили Х, начать заново?'
            }
        
            else 
                document.getElementsByTagName('h2')[0].innerHTML = 'Игра окончена, победили О, начать заново?'
        }
    }
    else console.log('Начние игру - нажав кнопку')
}



function draw() {       //рисуем крестик или нолик    
    if ( board.move % 2 != 0 ) {
        
        document.getElementsByTagName('h2')[0].innerHTML = 'Игра началась, ходит ' + 'X'
        board.arCell[board.activeCellX][board.activeCellY] = 'o' //пишем в массив нолик
        board.move ++
        ctx.beginPath()
        ctx.lineWidth = 5 
        ctx.strokeStyle = "black"
        ctx.arc(board.activeCellX1+70, board.activeCellY1+70,50,0, 2*Math.PI , true)
        ctx.stroke()
    }
        
    else {

        document.getElementsByTagName('h2')[0].innerHTML = 'Игра началась, ходит ' + 'O'
        board.arCell[board.activeCellX][board.activeCellY] = 'x' //пишем в массив крестик
        board.move ++
        ctx.beginPath()
        ctx.lineWidth = 5 
        ctx.strokeStyle = "black"
        ctx.moveTo(board.activeCellX1+10, board.activeCellY1+10);
        ctx.lineTo(board.activeCellX1+130, board.activeCellY1+130);
        ctx.moveTo(board.activeCellX1+130, board.activeCellY1+10);
        ctx.lineTo(board.activeCellX1+10, board.activeCellY1+130);
        ctx.stroke()  
    }
} 
  

function finishcheck() {    //провека на конец игры    
    let f=0
    for (i=0; i<3; i++) {
        for (j=0; j<3; j++) {
            if (board.arCell[i][j] ==='null' ) {
                f++
            }
        }
    }
    
    if (f===0) { 
        console.log('Игра окончена - ничья! Начните заново', board.arCell)  
        document.getElementsByTagName('h2')[0].innerHTML = 'Игра окончена - ничья! Начните заново'
    }

}


function check(simbol) { 
    let count = 0, x=0, y=0, result = false
    
    
    for (x=0; x<3; x++) {                                       //цикл проверяем горизонтальные линии
        count=0                                                 //сбрасываем каунт при переходе на новую линию
        for (y=0; y<3; y++) {

            if (board.arCell[x][y] === simbol) { 
                count++
            }
            
            else count=0

            if (count === 3) {
            result=true
            
            break                                                           
            }
        }
    }                           
   
    
    for (y=0; y<3; y++) {                                       //цикл проверяем вертикальные линии 
        count=0                                                 //сбрасываем каунт при переходе на новый столбец
        for (x=0; x<3; x++) {

            if (board.arCell[x][y] === simbol) { 
                count++
            }
            
            else count=0

            if (count === 3) {
            result=true
            
            break                                               //TODO - зачем - разобраться?      
            }
        }
    }                                           
    
    
    count=0                                                     //цикл проверяем диагонали 1
    for (x=0; x<3; x++) {                       
              
        if (board.arCell[x][x] === simbol) { 
                count++
        }
            
        else count=0

        if (count === 3) {
            result=true                          
        }
    } 

    
    count=0                                                       //цикл проверяем диагонали 2
    for (x=0, y=2; x<3, y>-1; x++, y--) {           

        if (board.arCell[x][y] === simbol) { 
            count++
        }

        else count=0

        if (count === 3) {
            result=true         
        }   

    }                                                   
        
    return result
}


function getRandomInt (min, max) {      //-- определяем кто ходит
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function start() {                      //--начинаем игру -- рисуем доску -- обнуляем массив -- определяем кто ходит
    
    board.start = true
    board.move = getRandomInt (0, 1)
   
    writeCarvas ()
    
    for (x=0; x<3; x++) {       
        for (y=0; y<3; y++) {
            board.arCell[x][y] = 'null' 
            
        }
    }

    if (board.move % 2 != 0) {
        
        document.getElementsByTagName('h2')[0].innerHTML = 'Игра началась, ходит ' + 'O'
    }

    else 
        document.getElementsByTagName('h2')[0].innerHTML = 'Игра началась, ходит ' + 'X'
}

//TODO сделать запись результатов
//TODO на BD
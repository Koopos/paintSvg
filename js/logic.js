function initStage(layer, stage) {

    stage.clear()

    const cellWidth = 10
    const cellInnerWidth = cellWidth * 0.8
    const cellPadding = (cellWidth - cellInnerWidth) / 2

    const columns = 800/ cellWidth;
    const rows = 618 / cellWidth;

    for(let i = 0; i < columns; i++) {
        for(let j = 0; j < rows; j++) {
            const box = new Konva.Rect({
                x: i*cellWidth + cellPadding,
                y: j*cellWidth + cellPadding,
                width: cellInnerWidth,
                height: cellInnerWidth,
                fill: "#fff",
                stroke: '#eee',
                strokeWidth:1,
                draggable: false,
            })
            layer.add(box)
        }
    }
}

function initOperationArea() {
    var stage = new Konva.Stage({
        container: "operations",
        width: 200,
        height: 618,
    })
    
    var layer = new Konva.Layer();
    stage.add(layer);

    var clearText = new Konva.Text({
        x: 40,
        y: 30,
        text: "Clear",
        fontSize: 30,
        fill: "green"
    })

    layer.add(clearText);

    clearText.on("click", function(e) {
        
    })
}

function initLifeCycle(layer, stage) {
    const dom = document.querySelector('#container');

    const clearButton = document.querySelector('#clear')

    let isPaint = false

    let lastLine = null

    stage.on('mousedown touchstart',(e) => {
        isPaint = true
        var pos = stage.getPointerPosition();
        lastLine = new Konva.Line({
            radius: 3,
            stroke: "black",
            strokeWidth: 4,
            lineJoin: "round",
            points: [pos.x, pos.y, pos.x, pos.y],
        })

        layer.add(lastLine)
    })

    stage.on('mouseup touchend', () => {
        isPaint = false
    })

    stage.on('mousemove touchmove',(e) => {
        if(!isPaint) {
            return
        }

        e.evt.preventDefault()

        const pos = stage.getPointerPosition();
        var newPoints = lastLine.points().concat([pos.x,pos.y])

        lastLine.points(newPoints)
    })

    // dom.addEventListener('mousedown', (e) => {
    //     isPaint = true
    // })

    // dom.addEventListener('mouseup',(e) => {
    //     isPaint = false
    //     prevPoint = {}
    // })

    // dom.addEventListener('mousemove', (e)=> {
    //     if(isPaint) {
    //         if(!prevPoint.x) {
    //             prevPoint = {
    //                 x: e.clientX,
    //                 y: e.clientY
    //             }
    //         }
    //         var line = new Konva.Line({
    //             radius: 3,
    //             stroke: "black",
    //             strokeWidth: 4,
    //             lineJoin: "round",
    //             points: [prevPoint.x, prevPoint.y, e.clientX, e.clientY],
    //         })
    //         layer.add(line)
    //         prevPoint.x = e.clientX
    //         prevPoint.y =e.clientY
    //     }
    // })

    clearButton.addEventListener("click",() => {
        initStage(layer, stage);
    })
}
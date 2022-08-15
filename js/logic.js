function initStage(layer, stage) {
    const cellWidth = 10
    const cellInnerWidth = cellWidth * 0.8
    const cellPadding = (cellWidth - cellInnerWidth) / 2

    const columns = 600/ cellWidth;
    const rows = 600 / cellWidth;

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

    var svgText = new Konva.Text({
        x: 660,
        y: 100,
        text: "生成svg",
        fontSize: 30,
        fill: "black"
    })

    var clearText = new Konva.Text({
        x: 660,
        y: 50,
        text: "Clear",
        fontSize: 30,
        fill: "green"
    })

    
    clearText.on("click", function(e) { 
        lineCache.forEach(v=>{
            v.destroy()
        })
    })

    svgText.on('click', () => {
        generateSvg()
    })

    layer.add(clearText);
    layer.add(svgText);

}

let lineCache = []

function initLifeCycle(layer, stage) {
    const dom = document.querySelector('#container');

    // const clearButton = document.querySelector('#clear')

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
        lineCache.push(lastLine)
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
}

function generateSvg() {
    let str= "<svg version=\"1.1\" viewBox=\"0 0 600 600\" xmlns=\"http://www.w3.org/2000/svg\">"
    lineCache.forEach(line=>{
        const v= line.points()
        let d=`M ${v[0]} ${v[1]}`

        for(let i = 2;i<v.length;i+=2) {
            d+=` L ${v[i]} ${v[i+1]}`
        }

        let path = `<path stroke="black" fill="none" d="${d} Z">`
        path+="</path>"
        str+=path
    })
    
    str+="</svg>"
    
    var container = document.querySelector('#svg')
    container.innerHTML=str
    return str
}
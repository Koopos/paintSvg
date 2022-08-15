var stage = new Konva.Stage({
    container: "container",
    width: 800,
    height: 618,
})

var layer = new Konva.Layer();
stage.add(layer);

initStage(layer, stage);
initOperationArea();
initLifeCycle(layer, stage);
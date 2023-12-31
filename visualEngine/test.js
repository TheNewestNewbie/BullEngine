document.body.onload = () => {
    BullEngine = new BullEngine("canvas", 50);
    BullEngine.setMapSize(30 , 30);
    BullEngine.start();
}
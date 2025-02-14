
export default function () {

    const imgWidgetContainer = document.getElementById('roomImageContainer');

    if(!imgWidgetContainer) {
        console.warn("No ROOMS image widget found!");
        return false;
    }

    const imgWidgetConfig = imgWidgetContainer.dataset;
    const imgArray = imgWidgetConfig.roomImages;
    console.log('Rooms Image Config', imgArray);
}

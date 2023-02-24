window.addEventListener('load', () => {
    const iFrame = document.createElement('iframe');
    iFrame.src = 'http://localhost:8080/marker.html'
    document.body.appendChild(iFrame);
    console.log('marker');
});


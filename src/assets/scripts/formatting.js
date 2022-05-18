export default function() {
    /**
     * Create a lead paragraph using the first sentence of description
     */
    console.log('formatting.js loaded');
    const desc = document.querySelector('.desc-full');
    const ptag = document.querySelector('.desc-full p');
    const p = document.createElement('p');

    // split into sentence array
    const t = ptag.innerText.split('.');
    // remove the first sentence
    const t1 = t.shift();
    // assign the remainder to the original tag
    ptag.innerText = t.join('. ');
    // prepend a new p tag
    desc.prepend(p);
    // add the first sentence
    p.append(t1 + '.');
}

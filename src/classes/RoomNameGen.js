const roomNameLength = 4;
function createRandomID() {
    let txt = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < roomNameLength) {
        txt += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return txt;
}

module.exports = createRandomID
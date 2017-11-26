/**
 *
 */

function wait(ms) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    })
}

function terminalType(prefix, text) {
    if (text == null) text = '';
    const line = document.createElement('div');
    line.className = 'line';
    prefix = prefix.replace(/ /g, '&nbsp;')
    line.innerHTML = prefix;

    document.querySelector('.terminal').appendChild(line);

    function type(text, line) {
        if (text === '') {
            return Promise.resolve();
        }
        line.textContent = line.textContent + text.charAt(0);
        return wait(100).then(() => type(text.substr(1), line));
    }

    return wait(500).then(() => type(text, line));
}

Promise.resolve()
    .then(() => terminalType('noah@loomans ~ $ ', 'cd Code/calculate_age'))
    .then(() => terminalType('noah@loomans ~/Code/calculate_age $ ', 'gcc calculate_age.c -o calculate_age'))
    .then(() => terminalType('noah@loomans ~/Code/calculate_age $ ', './calculate_age'))
    .then(() => terminalType('calculating', '.........'))
    .then(() => terminalType('  1111111        888888888'))
    .then(() => terminalType(' 1::::::1      88:::::::::88'))
    .then(() => terminalType('1:::::::1    88:::::::::::::88'))
    .then(() => terminalType('111:::::1   8::::::88888::::::8'))
    .then(() => terminalType('   1::::1   8:::::8     8:::::8'))
    .then(() => terminalType('   1::::1   8:::::8     8:::::8'))
    .then(() => terminalType('   1::::1    8:::::88888:::::8'))
    .then(() => terminalType('   1::::l     8:::::::::::::8'))
    .then(() => terminalType('   1::::l    8:::::88888:::::8'))
    .then(() => terminalType('   1::::l   8:::::8     8:::::8'))
    .then(() => terminalType('   1::::l   8:::::8     8:::::8'))
    .then(() => terminalType('   1::::l   8:::::8     8:::::8'))
    .then(() => terminalType('111::::::1118::::::88888::::::8'))
    .then(() => terminalType('1::::::::::1 88:::::::::::::88'))
    .then(() => terminalType('1::::::::::1   88:::::::::88'))
    .then(() => terminalType('111111111111     888888888'))
    .then(() => wait(2000))
    .then(() => document.querySelector('.down-arrow').classList.add('show'));

function resize() {
    const size = Math.min(window.innerWidth, window.innerHeight);
    const factor = size / 1080;
    document.documentElement.style.setProperty('--factor', factor);
}

resize();
window.addEventListener('resize', resize);
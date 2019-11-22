function fexec(code) {
    return Function(`return ${code}`)();
}

module.exports = fexec;
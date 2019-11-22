function isRequestPath(checkPath, requestURL, callBack) {
    if (typeof checkPath != "string") return false;
    if (typeof requestURL != "string") return false;
    resolvedData = requestURL.startsWith(checkPath);
    resolvedData = [resolvedData, checkPath.length];
    if (typeof callBack == 'function') {
        if (resolvedData[0]) return void callBack(requestURL.substr(resolvedData[1]));
    } else {
        return resolvedData;
    }
}

module.exports = isRequestPath;
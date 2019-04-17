class RouterReload {
    constructor(APP) {
        this.app = APP;
        this.stack = APP._router.stack;
    }
    reload(route, newRoute) {
        if(!route || !newRoute || !route instanceof String || !newRoute instanceof Function) {
            throw new Error("Missing / Invalid Paramater(s)");
        }
        var index = this.findInStack(route);
        if(index === -1) throw new Error("Router does not already exist.");
        this.replaceInStack(index, newRoute);
    };
    findInStack(route) {
        var foundLayer = this.stack.find(function(x) {
            return route.match(x.regexp) && x.name === "router";
        });
        var indexOfLayer = this.stack.indexOf(foundLayer instanceof Array ? foundLayer[0] : foundLayer);
        return indexOfLayer;
    };
    replaceInStack(index, newHandler) {
        this.app._router.stack[Number(index)].handle = newHandler;
        return true;
    };
    reloadFromFile(route, fullPath) {
        delete require.cache[require.resolve(fullPath)];
        var newHandle = require(fullPath);
        return this.reload(route, newHandle);
    };
};

module.exports = RouterReload;
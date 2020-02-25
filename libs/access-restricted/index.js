let globalCounter = 0
const checkAccess = (counter, limitation) => ( counter < limitation )

module.exports = function ( limitAccessCount ) {
    return function ({ res, next }) {
        globalCounter++;
        const allowAccess = checkAccess( globalCounter, limitAccessCount )

        if ( ! allowAccess ) {
            res.status(429);
            res.json({
                error: "Too many requests",
            });
            return res.end()
        }
        next()
    }
}

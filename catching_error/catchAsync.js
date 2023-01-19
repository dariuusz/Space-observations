//catches any errors related to async function such as unexisted ID or wrong type
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}
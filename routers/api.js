class Api {
    static getAllCategories (req, res) {
        console.log(req.url);
        res.end('getAllCategories...');
    }

    static getOneCategory (req, res) {
        console.log(req.url);
        res.end('getOneCategory...');
    }

    static getAllCourses (req, res) {
        console.log(req.url);
        res.end('getAllCourses...');
    }

    static getOneCourse (req, res) {
        console.log(req.url);
        res.end('getOneCourse...');
    }
}

module.exports = Api;
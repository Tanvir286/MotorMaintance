

const adminController = require("../controllers/adminController");
const registrationController = require("../controllers/registrationController");
const loginController = require("../controllers/loginController");
const createBlogController = require("../controllers/createBlog");
const upload = require("../helpers/imageUploder");
const allBlog = require("../controllers/allBlog");

const { getUpdateDescription,
    updateBlogPost,
    getUpdateStatus,
    getUpdateComment,
    getDelete,
    createTitle,
    getTitle,
    getTitleDelete,
 } = require("../controllers/UserController");



const { CreateForm, GetForm} = require("../controllers/formController");


const router = require("express").Router();


/*========admin login and registration========*/
router.post('/admin',adminController); 
router.post('/registration',registrationController);
router.post('/login',loginController);

/*========Post & AllPost========*/
router.post('/post', upload.array('images'), createBlogController);
router.get("/allblog",allBlog) 


/*========title post and get========*/
router.post('/createtitle',createTitle);
router.get('/gettitle',getTitle);
router.delete('/getTitleDelete/:title',getTitleDelete);


/*========status and description change========*/
router.put('/status/:title',  getUpdateStatus)


/*========Admin Comment Start========*/
router.put('/admincomment/:title', getUpdateComment)


/*========Delete Part Start========*/
router.delete('/delete/:title', getDelete)




router.patch("/update/:des",getUpdateDescription) 
router.patch("/updates/:ima",updateBlogPost) 
// router.post("/post",upload.array('image',5) ,createBlogController)


// 
router.post("/create",CreateForm);
router.get("/get",GetForm);


module.exports = router; 
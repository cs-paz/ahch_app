const homeRoutes = require('./home'); 
const addcaseRoutes = require('./addcase'); 
const caseRoutes = require('./cases'); 
const caseSearchRoutes = require('./casesearch')
const adminRoutes = require('./admin');
const loginRoutes = require('./login');

const constructorMethod = (app) => {

    app.use('/login', loginRoutes);

    // app.use((req, res, next) => {
    //     if (!req.session.user) {
    //         return res.redirect('/login');
    //     } else {
    //         next();
    //     }
    // });

    app.use('/addcase', addcaseRoutes);
    app.use('/cases', caseRoutes);
    app.use('/casesearch', caseSearchRoutes);
    app.use('/admin', adminRoutes);
    app.use('/', homeRoutes);

    app.use('*', (req, res) => {   
        res.status(404).json({ error: 'Not found' });  
    }); 
};

module.exports = constructorMethod
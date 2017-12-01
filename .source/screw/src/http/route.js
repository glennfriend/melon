import controllersList from './controllersList.js';

const execute = function(url, params)
{
    const list = controllersList.getAll();

    try {
        let MyClass = list[url];
        let myClass = new MyClass(params);
        myClass.main();
    }
    catch (err) {
        console.log('<%cNOTICE%c> Not found "' + url + '"', 'color:red', 'color:blue');
        console.log(err);
        console.log("====");
    }
};

const myRoute = {

    run: function(url, params={})
    {
        execute(url, params);
    }

};

export default myRoute;
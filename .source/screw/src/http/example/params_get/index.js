
module.exports = class Example__params_get {

    constructor(params)
    {
        this.importData = params;
    }

    main()
    {
        console.log("[load] example/params_get");
        console.log(this.importData);
    }

}

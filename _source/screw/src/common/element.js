
const _ = {

    /**
     * get element by id
     *
     * @param name
     * @returns {*}
     */
    getById: function(id)
    {
        let element = document.getElementsById(id);
        if (element && element[0]) {
            return element[0];
        }
        return null;
    },

    /**
     * get element by name (first find of name)
     *
     * @param name
     * @returns {*}
     */
    getByName: function(name)
    {
        let element = document.getElementsByName(name);
        if (element && element[0]) {
            return element[0];
        }
        return null;
    },

    /**
     * select element add many options
     *
     * @param element
     * @param optionsArray
     */
    appendOptions: function(name, optionsArray)
    {
        let element = this.name(name);

        for (let i=0; i<(optionsArray).length; i++) {
            let option = document.createElement("option");
            option.value = optionsArray[i].value;
            option.text  = optionsArray[i].text;
            element.add(option, null);
        }
    },

};


const element = {

    id: function(id) {
        return _.getById(id);
    },

    name: function(name) {
        return _.getByName(name);
    },

    appendOptions: function(name, optionsArray) {
        return _.appendOptions(name, optionsArray);
    },

};


export default element;


// --------------------------------------------------------------------------------
// 
// --------------------------------------------------------------------------------
const domUtility = {

    /**
     * 刪除指定的 element
     *
     * e.g.
     *      <a href="javascript:void(0)" onclick="domUtil.removeElement(this, 2);">
     *          kill myself parent node
     *      </a>
     *
     */
    removeElement: function(element, layer=1)
    {
        var node = element;
        for (let i=1 ; i<layer ; i++) {
            node = node.parentNode;
        }
        node.parentNode.removeChild(node);
    },

};

export default domUtility;

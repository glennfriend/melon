import php from 'phpjs';

/**
 * 文字截切
 *      - 截取較少的文字
 *      - 傳入的文字應該是要去除不必要 tag 的內容
 *
 * e.g.
 *      var html = 'hello <b>Jace</b> !';
 *      var word = php.htmlspecialchars(html);
 *      var shortWord = stringUtility.cropWord(word);
 *
 * @return string
 */
const cropWord = function(string, max, footString)
{
    if (string.length > max) {
        return string.substr(0, max) + footString;
    }
    else {
        return string;
    }
};


// --------------------------------------------------------------------------------
// 
// --------------------------------------------------------------------------------
const stringUtility = {

    cropWord: function(string, max=50, footString="...")
    {
        return cropWord(string, max, footString);
    },

};

export default stringUtility;

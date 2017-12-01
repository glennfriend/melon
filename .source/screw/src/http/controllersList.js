import Example__console_log     from './example/console_log/index.js';
import Example__url_parse       from './example/url_parse/index.js';
import Example__params_get      from './example/params_get/index.js';
import Example__cookie_get      from './example/cookie_get/index.js';
import Example__grammar_async   from './example/grammar_async/index.js';
import Report__cash             from './report/cash/index.js';

const controllersList = {
    getAll: function() {
        return {
            'example/console_log':      Example__console_log,
            'example/url_parse':        Example__url_parse,
            'example/params_get':       Example__params_get,
            'example/cookie_get':       Example__cookie_get,
            'example/grammar_async':    Example__grammar_async,
            'report/cash':              Report__cash,
        };
    }
};

export default controllersList;

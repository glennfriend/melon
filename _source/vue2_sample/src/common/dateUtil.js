import moment from 'moment';

export default class dateUtil
{
    /**
     * 當時間是正傳的時候, 才會回傳 YYYY-MM-DD
     */
    static getCorrectYyyymmdd (year, month, day)
    {
        if (! year ||
            ! month ||
            ! day)
        {
            return null;
        }

        const date = moment({
            yaer:   year,
            month:  month - 1,
            day:    day,
            hour:   0, 
            minute: 0, 
            second: 0, 
            millisecond: 0
        });
        if (! date.isValid()) {
            return null;
        }

        return date.format('YYYY-MM-DD');
    }

}

    
    
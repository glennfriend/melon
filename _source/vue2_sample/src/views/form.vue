<template>
    <div>

        <div>
            <div v-once> {{ message }} </div>
            <div v-html="message"></div>
        </div>

        <p>
            <input type="text" placeholder="first_name"
                autofocus
                @click="doFirstName()"
                v-model="first_name"
            >
        </p>

        <p id="abc">
            <input type="email" placeholder="your@email.com"
                @change="doEmail"
                v-model="email"
            >
            <span class="error-message">-- empty --</span>
            <!--
                <span xxx-show="maps.sports[3]">[ ]</span>
                <span xxx="error.has('email')">{{ error.show('email') }}</span>
                <span xxx="error.email)">{{ error.email) }}</span> => 試試看這個
            -->
        </p>

        <p>
            sports
            <span v-for="item in maps.sports">
                <input type="checkbox" name="sports[]" v-model="sports" :value="item.value">{{ item.text }}
            </span>
        </p>

        <p>
            <select name="birthday[year]" v-model="birthday_year">
                <option value="">Year</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
            </select>
            <select name="birthday[month]" v-model="birthday_month">
                <option value="">Month</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
            <select name="birthday[day]" v-model="birthday_day">
                <option value="">Day</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="31">31</option>
            </select>
        </p>
        <span v-show="getBirthday">correct date: {{ getBirthday }}</span>

        <p>
            many_choose
            <br>
            <select multiple="multiple" size="6" name="many_choose">
                <option value="sun">sun</option>
                <option value="moon">moon</option>
                <option value="earth">earth</option>
                <option value="mars">mars</option>
                <option value="jupiter">jupiter</option>
                <option value="saturn">saturn</option>
            </select>
        </p>

        <p>
            gender
            <input type="radio" name="gender" value="1" v-model="gender"> male
            <input type="radio" name="gender" value="2" v-model="gender"> female
            <input type="radio" name="gender" value="3" v-model="gender"> arcane
        </p>
        <p>
            a/b
            <input type="radio" value="a"> a
            <input type="radio" value="b"> b
        </p>

        <p>
            <textarea name="article_1">article 1</textarea>
        </p>
        <p>
            <textarea name="article_2">article 2</textarea>
        </p>

        <p>
            <div>
                <span v-if="first_name">
                    my name is <b>{{ first_name }}</b>
                </span>
                {{ getGender }}
                {{ getSports }}
            </div>
        </p>

        <input type="submit">

    </div>
</template>

<script>
import dateUtil from '../common/dateUtil.js';
import Vue from 'vue';

/**
 * validate RegExp rule
 */
const verifier = {
    email: function(value)
    {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (! re.test(value.toLowerCase())) {
            return false;
        }
        return true;
    }
};

/**
 * form error control
 *      - 顯示錯誤 or 隱藏正確
 *      - 顯示自訂義的錯誤訊息
 *      - 包含 css class
 */
const errorControl = (event, isValid, errorMessage) =>
{
    if (! errorMessage) {
        errorMessage = 'You must enter the correct value';
    }

    const element = event.target;
    let errorElement = element.parentElement.getElementsByClassName("error-message")[0];
    if (! errorElement) {
        return;
    }

    if (isValid) {
        errorElement.classList.add("is_hidden");
        return;
    }
    errorElement.classList.remove("is_hidden");
    errorElement.innerHTML = errorMessage;
};

/**
 *
 */
const controller = {
    data: function () {
        return {
            maps: {
                sports: [
                    {value: 0, text: 'handball'     },
                    {value: 1, text: 'football'     },
                    {value: 2, text: 'basketball'   },
                    {value: 3, text: 'badminton'    },
                ],
            },
            message: 'v0.1 about <b>Form</b> information.',
            first_name: '',
            email: '',
            sports: [],
            gender: '',
            birthday_year: '',
            birthday_month: '',
            birthday_day: '',
            // form_errors: [],     //  v-show="form_errors.has('email')" ??
            // error: [],           //  v-show="error.email" ??
        };
    },
    watch: {
        // first_name: function () {}
    },
    computed: {
        getGender: function()
        {
            const mapping = {
                1: '👨',
                2: '👩',
                3: '😄',
            }
            return mapping[this.gender];
        },
        getBirthday: function()
        {
            if (! this.birthday_year ||
                ! this.birthday_month ||
                ! this.birthday_day)
            {
                return null;
            }

            return dateUtil.getCorrectYyyymmdd(this.birthday_year, this.birthday_month, this.birthday_day)
        },
        getSports: function ()
        {
            if (! this.sports ||
                this.sports.length < 1) {
                return;
            }

            const translations = this.sports.map(id => {
                return this.maps.sports[id].text;
            });

            return 'i like ' + translations.join(',');
        },
    },
    methods: {
        doFirstName: function()
        {
            // console.log('doFirstName');
        },
        doEmail: function (event)
        {
            const isValid = verifier.email(this.email);
            errorControl(event, isValid);
        },
    },
    created: function () {
        //console.log(1);
        //Vue.use(VeeValidate);
    },
}

export default controller;
</script>

<style>
.is_hidden {
    display: none;
}
.error-message {
    color: red;
}
</style>
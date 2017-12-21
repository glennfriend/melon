<template>
<div class="row">
    <div class="col-md-12">

        <span v-model="render_count">{{ render_count }}</span>

        <div>
            <div v-once> {{ message }} </div>
            <div v-html="message"></div>
        </div>

        <div class="form-group">
            <input type="text" name="first_name" class="form-control" placeholder="first_name"
                autofocus
                v-model="first_name"
                :class="{'is-invalid':error.first_name }"
                data-validate="required|min:5"
            >
        </div>

        <div class="form-group">
            <label for="emailFor">Email address</label>
            <input type="email" name="email" class="form-control" id="emailFor" placeholder="your@email.com"
                :class="{'is-invalid':error.email }"
                v-model="email"
                data-validate="required|email">
            <div class="invalid-feedback" v-show="error.email">{{ error.email }}</div>
            <!--
                @change="doEmail"
                v-model="email"
            -->
        </div>

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

                {{ first_name }}
            </div>
        </p>

        <input type="submit">

    </div>
</div>
</template>


<script>
import dateUtil from '../common/dateUtil.js';
import verifier from '../common/verifier.js';
import validatorUtil from '../common/validatorUtil.js';
import Vue from 'vue';

/**
 *
 */
const controller = {
    data: function () {
        return {
            imports: {
                first_name: "bob",
            },
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

            // form errors
            error: [],

            // 由於 bind 會延遲而導至無法在正確的時間 rander, 在此利用了 v-model 的方法來觸發
            // <span v-model="render_count"></span>
            render_count: 0,
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
    },
    mounted: function () {
        validatorUtil.run(this, (info) => {
            console.log(info);
            if (info.isError) {
                // this.error[info.target.name] = 'is error';
            }
            this.render_count++;
        });
    },
};


// debug only
//window.controller = controller;


export default controller;
</script>


<style>
</style>
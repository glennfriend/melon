<template>
    <div>
        this is {{page}} 頁面
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            page: 'index'
        }
    }
}
</script>

<style>
body {
    font-size: 20px;
}
</style>
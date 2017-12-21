<template>
    <div>
        <div>
            <router-link to="/index">Home</router-link>
            <router-link to="/form">Form</router-link>
            <router-link to="/live_cycle">Life Cycle</router-link>
        </div>
        <div>----</div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
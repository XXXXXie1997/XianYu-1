<template>
        <router-view/>
</template>

<style lang="scss">
    @import "./assets/style/reset.scss";
    @import "./assets/style/helper.scss";

    body {
        line-height: 1.5;
    }

    body {
        background: #000;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        color: #000;
        font-family: $font-hei;
        font-size: 16px;
        line-height: 1.5;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        $bg:#000;
        background: #000;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

</style>

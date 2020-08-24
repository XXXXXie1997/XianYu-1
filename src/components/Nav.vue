<template>
    <nav>
            <router-link to="/money" class="item" active-class="selected">
                <Icon name="money"/>
                记账
            </router-link>

            <router-link to="/labels" class="item" active-class="selected">
                <Icon name="label"/>
                标签
            </router-link>

            <router-link to="/statistics" class="item" active-class="selected">
                <Icon name="statistics"/>
                统计
            </router-link>
    </nav>
</template>

<script lang='ts'>

  export default {};
</script>

<style lang="scss" scoped>
    @import "../assets/style/helper.scss";
    nav {
        @extend %outerShadow;
        display: flex;
        flex-direction: row;
        font-size: 12px;
        color: rgb(36,113,155);

        > .item {
            padding: 2px 0;
            width: 33.33333%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background: rgba(33,33,33,0.8);
         color: whitesmoke;

            .icon {
                width: 32px;
                height: 32px;
            }
        }
        > .item.selected{
            $bg:rgb(33,33,33);
            background: lighten($bg,10%);
            color: rgb(255,190,0);

        }
    }
</style>
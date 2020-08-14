<template>

    <div class="tags">
        <div class="new">
            <button>新增标签</button>
        </div>
        <ul class="current">
            <li>衣</li>
            <li>食</li>
            <li>住</li>
            <li>行</li>
        </ul>
    </div>

</template>

<script>
  export default {
    name: "Tags"
  }
</script>

<style lang="scss" scoped>
    .tags {
        font-size: 14px;
        padding: 16px;
        flex-grow: 1;
        display: flex;
        flex-direction: column-reverse;

    > .current {
        display: flex;
        flex-wrap: wrap;

    > li {
        background: rgb(61,140,181);
        color: whitesmoke;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;
    }
    }

    > .new {
        padding-top: 16px;

    button {
        background: transparent;
        border: none;
        color: rgba(61,129,166,0.7);
        border-bottom: 1px solid rgb(64,161,211);
        padding: 0 4px;
    }
    }
    }

</style>
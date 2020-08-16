<template>
    <div>
        <label class="notes">
            <span class="name">备注</span>
            <input type="text" placeholder="在这里输入备注">
        </label>
    </div>
</template>

<script>
  export default {
    name: "Notes"
  }
</script>

<style lang="scss" scoped>
    .notes {
        color: whitesmoke;
        font-size: 16px;
        background: rgba(65,171,226,0.9);
        padding-left: 16px;
        display: flex;
        align-items: center;

    .name {
        padding-right: 16px;
    }

    input {
        font-size: 14px;
        color: whitesmoke;
        height: 64px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
    }
    }

</style>
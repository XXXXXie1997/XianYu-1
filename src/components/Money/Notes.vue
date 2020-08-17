<template>
    <div>
        <label class="notes">
            <span class="name">备注</span>
            <input type="text"
                   v-model='value'
                   placeholder="在这里输入备注">
        </label>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';
    @Watch('value')
    onValueChanged(value: string){
      this.$emit('update:value',value)
    }
  }
</script>

<style lang="scss" scoped>
    .notes {
        color: whitesmoke;
        font-size: 16px;
        background: rgba(65, 171, 226, 0.9);
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
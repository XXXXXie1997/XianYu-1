<template>
    <div>
        <label class="formItem">
            <span class="name">{{this.fieldName}}</span>
            <input type="text"
                   :value="value"
                   @input="onValueChanged($event.target.value)"
                   :placeholder="placeholder">
        </label>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch,Prop} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
   @Prop({default:''}) readonly value!: string;

    @Prop({required:true}) fieldName!: string;
    @Prop() placeholder?: string;

    onValueChanged(value: string){
      this.$emit('update:value',value)
    }
  }
</script>

<style lang="scss" scoped>
    .formItem {
        color: rgb(59,138,179);
        font-size: 16px;
        padding-left: 16px;
        display: flex;
        align-items: center;

        .name {
            padding-right: 16px;
        }

        input {
            font-size: 14px;
            color: rgb(59,138,179);
            height: 40px;
            flex-grow: 1;
            background: transparent;
            border: none;
            padding-right: 16px;
        }
    }

</style>
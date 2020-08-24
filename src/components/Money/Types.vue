<template>
    <div>
        <ul class="types">
            <li :class="value === '-' && 'selected'"
                @click="selectType('-')">
                支出
            </li>
            <li :class="value === '+' && 'selected'"
                @click="selectType('+')">
                收入
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from "vue-property-decorator";

  @Component


  export default class Types extends Vue {
    @Prop() readonly value!: string;

    selectType(type: string) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      this.$emit('update:value', type);
    }
  }
</script>

<style lang="scss" scoped>
    .types {
        background: rgba(33, 33, 33, 0.8);
        color: whitesmoke;
        display: flex;
        text-align: center;
        font-size: 24px;
        border-top: 1px solid rgb(55, 55, 55);

        > li {
            width: 50%;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgb(77, 77, 77);
            }
        }
    }
</style>
<template>
    <div>
        <ul class="types">
            <li :class="{selected:value === '-',
            [classPrefix+'-item']:classPrefix}"
                @click="selectType('-')">
                支出
            </li>
            <li :class="{selected:value === '+',
            [classPrefix+'-item']:classPrefix}"
                @click="selectType('+')">
                收入
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from "vue-property-decorator";

  @Component


  export default class Types extends Vue {
    @Prop(String) readonly value!: string;

    @Prop(String) classPrefix?: string;

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
   border: 1px solid rgb(55,55,55);
        border-bottom: none;

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
                background: rgb(255,190,0);
            }
        }
    }
</style>
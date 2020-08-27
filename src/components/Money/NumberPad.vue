<template>
    <div class="numberPad">
        <div class="output">{{output}}</div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="remove" class="remove">
                <Icon name="delete" class="icon-delete"/>
            </button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="clear" class="clear">AC</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button @click="ok" class="ok">OK</button>
            <button @click="inputContent" class="zero">0</button>
            <button @click="inputContent">.</button>

        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from "vue-property-decorator";

  @Component


  export default class NumberPad extends Vue {
    @Prop() readonly value!: number;
    output = this.value.toString();

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      if (this.output.length === 16) {
        return;
      }
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {
        return;
      }
      this.output += input;
    }

    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output = this.output.slice(0, -1);
      }
    }

    clear() {
      this.output = '0';
    }

    ok() {
      this.$emit('update:value', this.output);
      this.$emit('submit', this.output);
      this.output = '0';
    }
  }
</script>

<style lang="scss" scoped>
    @import "src/assets/style/helper.scss";

    .numberPad {
        .output {
            @extend %clearFix;
            @extend %innerShadow;
            border-top: 1px solid rgb(55, 55, 55);
            border-bottom: 1px solid rgb(55, 55, 55);
            font-size: 36px;
            font-family: Consolas, monospace;
            padding: 9px 16px;
            text-align: right;
            background: rgba(33, 33, 33, 0.8);
            color: white;
            height: 72px;
        }

        .buttons {
            @extend %clearFix;

            > button {
                padding: 5px;
                background: rgb(33, 33, 33);
                font-size: 18px;
                color: white;
                width: 25%;
                height: 64px;
                float: left;
                border: 1px solid rgb(55, 55, 55);

                $bg: rgba(33, 33, 33);

                &.zero {
                    width: 25*2%;
                }

                &.ok {
                    height: 64*2px;
                    float: right;
                    background: rgb(255, 190, 0);
                    color: white;
                }

                &.remove {
                    color: rgb(255, 190, 0);
                }

                &.clear {
                    color: rgb(255, 190, 0);
                }


            }

            > button:active {
                background: rgb(77, 77, 77);

                &.ok {
                    $bg: rgb(255, 190, 0);
                    background: darken($bg, 20%);
                }
            }


        }

        .icon-delete {
            font-size: 24px;
        }
    }


</style>
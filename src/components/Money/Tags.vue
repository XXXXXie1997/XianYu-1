<template>

    <div class="tags">
        <div class="new">
            <button @click="createTag">新建标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id"
                :class="{selected: selectedTags.indexOf(tag)>=0}"
                @click="toggle(tag)">
                {{tag.name}}
            </li>
        </ul>
    </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import TagHelper from "@/mixins/TagHelper";
  import {mixins} from "vue-class-component";


  @Component
  export default class Tags extends mixins(TagHelper) {
    selectedTags: string[] = [];
    get tagList(){
      return this.$store.state.tagList;

    }

    created() {
      this.$store.commit('fetchTags');
    }


    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
    }


  }
</script>

<style lang="scss" scoped>
    .tags {
        background: #000;
        font-size: 14px;
        padding: 16px;
        flex-grow: 1;
        display: flex;
        flex-direction: column-reverse;

        > .current {
            display: flex;
            flex-wrap: wrap;

            > li {
                $bg: rgb(77, 77, 77);
                background: $bg;
                color: whitesmoke;
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 4px;

                &.selected {
                    background: rgb(255, 190, 0);
                    color: rgb(33, 33, 33);
                }
            }
        }

        > .new {
            padding-top: 16px;
            text-align: center;

            button {
                background: transparent;
                border: none;
                color: rgba(255, 190, 0, 0.6);
                border-bottom: 1px solid rgba(255, 190, 0, 0.8);
                padding: 0 4px;
            }
        }
    }

</style>
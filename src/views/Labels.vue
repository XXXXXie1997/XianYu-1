<template>
    <Layout>
        <div class="tags">
            <router-link class="tag" v-for="tag in tags" :key="tag.id"
                         :to="`/labels/edit/${tag.id}`">
                <span>{{tag.name}}</span>
                <Icon name="right"/>
            </router-link>
        </div>
        <div class="createTag-wrapper">
            <Button class="createTag"
                    @click="createTag">
                新建标签
            </Button>
        </div>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from "@/components/Button.vue";
  import store from "@/store/index2";


  @Component({
    components: {Button}
  })
  export default class Labels extends Vue {
    tags = store.tagList;

    createTag() {
      const name = window.prompt('请输入标签名');
      if (name) {
    store.createTag(name);
      }
    }
  }
</script>

<style lang="scss" scoped>
    .tags {
        max-height:80%;
        color: white;
        background: rgb(77,77,77);
        font-size: 16px;
        padding-left: 16px;
        overflow: auto;

        > .tag {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgb(100,100,100);

            svg {
                width: 18px;
                height: 18px;
                color: #fff;
                margin-right: 16px;
            }
        }
    }

    .createTag {
        $bg:rgb(255,190,0);
        background: $bg;
        color: #000;
        border-radius: 4px;
        border: 2px solid lighten($bg,20%);
        height: 40px;
        padding: 0 16px;

        &-wrapper {
            text-align: center;
            padding: 16px;
            margin-top: 44-16px;
        }
    }

</style>
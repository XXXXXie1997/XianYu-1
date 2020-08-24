<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click="goBack"/>
            <span class="title">
                编辑标签
            </span>
            <span class="rightIcon"></span>
        </div>
        <div class="form-wrapper">
            <FormItem :value="tag.name"
                      @update:value="update"
                      field-name="标签名" placeholder="请输入标签名"/>
        </div>
        <div class="button-wrapper">
            <Button @click="remove" class="removeTag">删除标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from "@/models/tagListModel";
  import FormItem from "@/components/Money/FormItem.vue";
  import Button from "@/components/Button.vue";

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    tag?: { id: string; name: string } = undefined;

    created() {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(t => t.id === id)[0];
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }

    update(name: string) {
      if (this.tag) {
        tagListModel.update(this.tag.id, name);
      }

    }

    remove() {
      if (this.tag) {
        if (tagListModel.remove(this.tag.id)) {
          window.alert('删除成功！');
          this.$router.back();
        } else {
          window.alert('删除失败');
        }
      }
    }

    goBack() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
    .navBar {
        background: rgb(77,77,77);
        color: white;
        text-align: center;
        font-size: 16px;
        padding: 10px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .title {

        }

        > .leftIcon {
            width: 24px;
            height: 24px;
        }

        > .rightIcon {
            width: 24px;
            height: 24px;
        }
    }

    .form-wrapper {
        background: rgb(111,111,111);
        margin-top: 4px;
    }

    .button-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }
    .removeTag{
        $bg:rgb(255,190,0);
        background: $bg;
        color: #000;
        border-radius: 4px;
        border: 2px solid lighten($bg,20%);
        height: 40px;
        padding: 0 16px;
    }
</style>
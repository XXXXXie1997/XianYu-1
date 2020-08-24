<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
        <Types :value.sync="record.type"/>
        <div class="notes">
        <FormItem field-name="备注"
                  placeholder="在这里输入备注"
                  @update:value='onUpdateNotes'/>
        </div>
        <Tags :data-source.sync="tags"
              @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from "@/components/Money/NumberPad.vue";
  import FormItem from "@/components/Money/FormItem.vue";
  import Tags from "@/components/Money/Tags.vue";
  import Types from "@/components/Money/Types.vue";
  import {Component, Watch} from "vue-property-decorator";
  import recordListModel from "@/models/recordListModel";

  const recordList = recordListModel.fetch();
  const version = window.localStorage.getItem('version') || 0;
  //version0.0.2 数据迁移
  if (version === '0.0.1') {
    recordList.forEach(record => {
      record.createdAt = new Date(2020, 1, 1);
    });
    //保存数据
    window.localStorage.setItem('recordList', JSON.stringify(recordList));
  }
  //升级版本
  window.localStorage.setItem('version', '0.0.2');


  @Component({
    components: {Types, Tags, FormItem, NumberPad},
  })
  export default class Money extends Vue {
    tags = window.tagList;
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };
    recordList: RecordItem[] = recordList;

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord() {
    recordListModel.create(this.record)
    }

    @Watch('recordList')
    onRecordListChange() {
      recordListModel.save();
    }
  }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
    .notes{
        padding: 12px 0;
    }
</style>

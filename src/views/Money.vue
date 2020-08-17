<template>
    <Layout class-prefix="layout">
        {{recordList}}
        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
        <Types :value.sync="record.type"/>
        <Notes @update:value='onUpdateNotes'/>
        <Tags :data-source.sync="tags"
              @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from "@/components/Money/NumberPad.vue";
  import Notes from "@/components/Money/Notes.vue";
  import Tags from "@/components/Money/Tags.vue";
  import Types from "@/components/Money/Types.vue";
  import {Component, Watch} from "vue-property-decorator";

  const version = window.localStorage.getItem('version') || 0;
  const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
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

  type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
  }

  @Component({
    components: {Types, Tags, Notes, NumberPad},
  })
  export default class Monye extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: Record = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };
    recordList: Record[] = recordList;
    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord() {
      const record2: Record = JSON.parse(JSON.stringify(this.record));
      record2.createdAt = new Date();
      this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordListChange() {
      window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
    }
  }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>

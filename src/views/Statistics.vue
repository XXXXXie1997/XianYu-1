<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>

        <ol class="check">
            <li v-for="(group,index) in result" :key="index">
                <h3 class="title">{{group.title}}</h3>
                <ol>
                    <li class="record" v-for="item in group.items" :key="item.id">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}} </span>
                    </li>
                </ol>
            </li>
        </ol>

    </Layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from "vue-property-decorator";
  import Tabs from "@/components/Tabs.vue";
  import intervalList from "@/constants/intervalList";
  import recordTypeList from "@/constants/recordTypeList";

  @Component({
    components: {Tabs},
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      type Items = RecordItem[]
      type HashTableValue = { title: string; items: Items }
      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;
  }
</script>


<style lang="scss" scoped>
    ::v-deep {
        .type-tabs-item {
            background: black;
            border: none;

            &.selected {
                background: rgb(77, 77, 77);


                &::after {
                    display: none;
                }
            }
        }

        .interval-tabs-item {
            font-size: 18px;
            height: 48px;
            background: rgb(77, 77, 77);
            border: none;

            &.selected {
                background: rgb(77, 77, 77);

            }
        }
    }

    %item {
        padding: 8px 16px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .title {
        @extend %item;
        background: rgb(33,33,33);
        color: rgb(255, 190, 0);
        border-bottom: 1px solid rgb(55,55,55);
    }

    .record {
        @extend %item;
        background: black;
    }
    .notes{
        margin-right: auto;
        margin-left: 8px;
        color:rgb(150,150,150)
    }

    .check {
        color: white;
    }
</style>
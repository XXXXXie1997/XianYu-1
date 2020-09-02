<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <ol class="check">
            <li v-for="(group,index) in groupedList" :key="index">
                <h3 class="title">{{beautify(group.title)}}<span>共计：￥{{group.total}}</span></h3>
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
  import dayjs from "dayjs";
  import clone from "@/lib/clone";

  const oneDay = 86400 * 1000;

  @Component({
    components: {Tabs},
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }

    beautify(string: string) {
      const day = dayjs(string);
      const today = dayjs();
      if (day.isSame(today, 'day')) {
        return '今天';
      } else if (day.isSame(today.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(today.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(today, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) {return [];}
      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt)
          .valueOf() - dayjs(a.createdAt).valueOf());
      type Result = { title: string;total?: number;items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [recordList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'),  items: [current]});
        }
      }
     const x =  result.map(group => {
        group.total = group.items.reduce((sum,item)=>sum +item.amount,0);
      });
      return result;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
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
        background: rgb(33, 33, 33);
        color: rgb(255, 190, 0);
        border-bottom: 1px solid rgb(55, 55, 55);
        font-size: 16px;
    }

    .record {
        @extend %item;
        background: black;
    }

    .notes {
        margin-right: auto;
        margin-left: 8px;
        color: rgb(150, 150, 150)
    }

    .check {
        color: white;
    }
</style>
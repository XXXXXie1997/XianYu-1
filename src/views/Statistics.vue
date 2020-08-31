<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
        <div class="check">
            type:{{type}}
            <br/>
            interval:{{interval}}
        </div>
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
    type = '-';
    interval = 'day';
    intervalList = intervalList;
     recordTypeList = recordTypeList
  }
</script>


<style lang="scss" scoped>
    ::v-deep .type-tabs-item {
        background: black;
        border: none;

        &.selected {
            background: rgb(77, 77, 77);


            &::after {
                display: none;
            }
        }
    }

    ::v-deep .interval-tabs-item {
        font-size: 18px;
        height: 48px;
        background: rgb(77, 77, 77);
        border: none;

        &.selected {
            background: rgb(77, 77, 77);

        }
    }

    .check {
        color: white;
    }
</style>
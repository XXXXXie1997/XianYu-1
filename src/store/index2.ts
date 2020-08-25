import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

const store = {
  //record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),
  //tag store
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复，请检查');
    } else if (message === 'success') {
      window.alert('创建成功,新的标签会显示在记账页');
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
};

export default store;
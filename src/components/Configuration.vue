<!--
 * @Author: Klein
 * @Date: 2025-07-12 01:59:23
 * @LastEditors: Klein
 * @LastEditTime: 2025-07-12 05:09:45
 * @FilePath: /antique_book_generate/src/components/Configuration.vue
 * @Description:
-->
<template>
  <div class="configuration-content">
    <el-form :model="localForm" label-width="60px">
      <h1>配置</h1>
      <p class="tip">【注意】输出尽量控制在 100 页以内</p>
      <el-form-item label="书籍名称">
        <el-input v-model="localForm.title" size="mini" />
      </el-form-item>
      <el-form-item label="本书作者">
        <el-input v-model="localForm.author" size="mini" />
      </el-form-item>
      <el-form-item label="出版社">
        <el-input v-model="localForm.publisher" size="mini" />
      </el-form-item>
      <el-form-item label="出版时间">
        <el-input v-model="localForm.publishTime" size="mini" />
      </el-form-item>
      <el-form-item label="页面样式">
        <el-radio-group v-model="localForm.pageStyle" size="mini">
          <el-radio label="white">白</el-radio>
          <el-radio label="blue">蓝</el-radio>
          <el-radio label="red">红</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="字体颜色">
        <el-radio-group v-model="localForm.fontColor" size="mini">
          <el-radio label="black">黑</el-radio>
          <el-radio label="white">白</el-radio>
          <el-radio label="red">红</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="字体样式">
        <el-radio-group v-model="localForm.fontStyle" size="mini">
          <el-radio label="qiji-combo"></el-radio>
          <el-radio label="HanaMinA"></el-radio>
          <el-radio label="HanaMinB"></el-radio>
          <el-radio label="DaMengHan-2"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="字体大小">
        <el-radio-group v-model="localForm.fontSize" size="mini">
          <el-radio label="1rem">1倍</el-radio>
          <el-radio label="1.2rem">1.2倍</el-radio>
          <el-radio label="1.5rem">1.5倍</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="书籍内容">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="localForm.content"
          size="mini"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="操作">
        <el-button size="mini" type="primary" @click="updateForm">
          预览
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "configurationContent",
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localForm: { ...this.form }, // 避免直接修改 props
    };
  },
  methods: {
    updateForm() {
      this.localForm.isView = true;
      this.$emit("update-form", this.localForm);
    },
  },
  watch: {
    form: {
      handler(newVal) {
        this.localForm = { ...newVal };
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.tip {
  font-size: 1rem;
}
</style>

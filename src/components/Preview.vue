<!--
 * @Author: Klein
 * @Date: 2025-07-12 01:59:23
 * @LastEditors: Klein
 * @LastEditTime: 2025-07-12 05:09:00
 * @FilePath: /antique_book_generate/src/components/Preview.vue
 * @Description:
-->
<template>
  <div class="preview-content">
    <div class="header">
      <h1>
        『{{ localForm.title }}』{{ localForm.author }}
        {{ localForm.publisher }} {{ localForm.publishTime }} 预览
      </h1>
      <span>&nbsp;【共 {{ pages.length }} 页】</span>
    </div>
    <div class="canvas-list">
      <div
        id="canvas"
        class="canvas"
        v-for="(page, index) in pages"
        :key="index"
        ref="canvasPages"
        :style="{
          backgroundColor: localForm.pageStyle,
          color: localForm.fontColor,
          fontFamily: localForm.fontStyle,
          fontSize: localForm.fontSize,
        }"
      >
        {{ page }}
      </div>
    </div>
    <el-button
      style="margin-top: 20px"
      @click="savePDF"
      type="success"
      :loading="isLoading"
    >
      保存为PDF
    </el-button>
    <div
      id="canvas"
      class="canvas"
      ref="measurer"
      style="visibility: hidden; position: absolute; top: -9999px"
      :style="{
        backgroundColor: localForm.pageStyle,
        color: localForm.fontColor,
        fontFamily: localForm.fontStyle,
        fontSize: localForm.fontSize,
      }"
    >
      <div class="text-block" ref="measureText"></div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  name: "previewContent",
  form: {
    type: Object,
    required: true,
  },
  data() {
    return {
      localForm: {},
      pages: [], // 分页后的内容
      isLoading: false,
    };
  },
  methods: {
    refresh(form) {
      this.localForm = { ...form };
      if (this.localForm.content?.length) {
        this.splitToPages();
      }
    },
    splitToPages() {
      const chars = this.localForm.content.split("");
      const pages = [];
      const textEl = this.$refs.measureText;
      const canvasEl = this.$refs.measurer;
      let currentPageText = "";
      textEl.innerText = "";
      for (let i = 0; i < chars.length; i++) {
        currentPageText += chars[i];
        textEl.innerText = currentPageText;
        // 关键判断改为 scrollWidth > clientWidth（竖排）
        if (canvasEl.scrollWidth > canvasEl.clientWidth) {
          // 溢出，去掉当前这个字符作为新一页开头
          const pageText = currentPageText.slice(0, -1);
          pages.push(pageText);
          // 重置新页
          currentPageText = chars[i];
          textEl.innerText = currentPageText;
        }
      }
      // 最后一页
      if (currentPageText) {
        pages.push(currentPageText);
      }
      this.pages = pages;
    },
    async savePDF() {
      this.isLoading = true;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [800, 400],
      });
      for (let i = 0; i < this.$refs.canvasPages.length; i++) {
        const canvasEl = this.$refs.canvasPages[i];
        const canvas = await html2canvas(canvasEl, {
          scale: 2,
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");
        if (i !== 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, 800, 400);
        console.log(i);
      }
      this.isLoading = false;
      pdf.save(
        this.localForm.title + "【" + this.localForm.author + "】" + ".pdf"
      );
    },
  },
};
</script>

<style lang="less" scoped>
.preview-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .header {
    display: flex;
    align-items: center;
  }
  .canvas-list {
    flex: 1;
    overflow-y: auto;
    // 隐藏滚动条样式（兼容 Chrome、Edge、Safari）
    &::-webkit-scrollbar {
      display: none;
    }
    // Firefox 隐藏滚动条
    scrollbar-width: none;
    // IE/Edge 旧版本
    -ms-overflow-style: none;
  }
  .canvas {
    width: 800px;
    height: 400px;
    background-color: red;
    writing-mode: vertical-rl;
    overflow: hidden;
    font-size: 1.2rem;
    line-height: 1.6;
    word-break: break-word;
    white-space: pre-wrap;
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-variant: normal !important;
    .text-block {
      white-space: pre-wrap;
      word-break: break-word;
      letter-spacing: 1px;
      font-variant: normal !important;
    }
  }
}
</style>

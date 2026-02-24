<template>
  <div class="api-example">
    <h2>Axios 全局导入使用示例</h2>

    <el-card class="example-card">
      <div slot="header">
        <span>HTTP 请求示例</span>
      </div>

      <el-button @click="getUserInfo" type="primary" :loading="loading">
        {{ loading ? '请求中...' : '获取用户信息' }}
      </el-button>

      <el-button @click="postData" type="success" :loading="postLoading">
        {{ postLoading ? '提交中...' : '提交数据' }}
      </el-button>

      <div class="result" v-if="result">
        <h3>响应结果:</h3>
        <pre>{{ formatResult(result) }}</pre>
      </div>

      <div class="error" v-if="error">
        <h3>错误信息:</h3>
        <pre>{{ error }}</pre>
      </div>
    </el-card>

    <el-card class="config-card">
      <div slot="header">
        <span>Axios 配置信息</span>
      </div>
      <ul>
        <li><strong>Base URL:</strong> {{ baseURL }}</li>
        <li><strong>Timeout:</strong> {{ timeout }}ms</li>
        <li><strong>Headers:</strong> {{ headers }}</li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ApiExample',
  data() {
    return {
      loading: false,
      postLoading: false,
      result: null,
      error: null,
      // 显示配置信息
      baseURL: this.$http.defaults.baseURL || '未设置',
      timeout: this.$http.defaults.timeout,
      headers: JSON.stringify(this.$http.defaults.headers, null, 2)
    }
  },
  methods: {
    // GET 请求示例
    async getUserInfo() {
      this.loading = true
      this.result = null
      this.error = null

      try {
        // 示例：获取用户信息（实际使用时替换为真实API）
        const response = await this.$http.get('/cwca-api/')

        // 解析HTML内容并提取链接信息
        const extractedLinks = this.extractLinksFromHtml(response);
        this.result = extractedLinks;

        this.$message.success('请求成功')
      } catch (err) {
        this.error = err.message || err
        this.$message.error('请求失败: ' + (err.message || '未知错误'))
      } finally {
        this.loading = false
      }
    },

    // 提取HTML中链接信息的方法
    extractLinksFromHtml(htmlContent) {
      try {
        // 创建临时DOM元素来解析HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        // 存储提取的结果
        const linksData = [];

        // 查找所有包含title的元素（可能是h1-h6标签）
        const titleElements = doc.querySelectorAll('.mLst');

        titleElements.forEach(titleElement => {
          titleElement.childNodes && titleElement.childNodes.forEach(nextElement => {
            // 如果找到了ul元素
            if (nextElement && nextElement.tagName === 'UL') {
              const ulElement = nextElement;
              const titleText = titleElement.textContent.trim();

              // 遍历ul下的所有li节点
              const liElements = ulElement.querySelectorAll('li');
              liElements.forEach(liElement => {
                // 提取li中的链接信息
                const linkElement = liElement.querySelector('a');
                if (linkElement) {
                  const linkText = linkElement.textContent.trim();
                  const linkHref = linkElement.getAttribute('href');

                  linksData.push({
                    title: titleText,
                    content: linkText,
                    href: linkHref || '',
                    fullElement: liElement.outerHTML
                  });
                } else {
                  // 如果li中没有链接，也记录纯文本内容
                  linksData.push({
                    title: titleText,
                    content: liElement.textContent.trim(),
                    href: '',
                    fullElement: liElement.outerHTML
                  });
                }
              });
            }
          });
        });

        return {
          totalLinks: linksData.length,
          links: linksData,
          summary: this.generateSummary(linksData)
        };

      } catch (error) {
        console.error('解析HTML时出错:', error);
        return {
          error: '解析HTML内容时发生错误',
          details: error.message
        };
      }
    },

    // 生成汇总内容
    generateSummary(linksData) {
      if (linksData.length === 0) {
        return '未找到任何链接信息';
      }

      // 按标题分组统计
      const groupedByTitle = {};
      linksData.forEach(item => {
        if (!groupedByTitle[item.title]) {
          groupedByTitle[item.title] = [];
        }
        groupedByTitle[item.title].push(item);
      });

      let summary = `总共找到 ${linksData.length} 个链接项：\n\n`;

      Object.keys(groupedByTitle).forEach(title => {
        const items = groupedByTitle[title];
        summary += `${title} (${items.length}项):\n`;
        items.forEach((item, index) => {
          summary += `  ${index + 1}. ${item.content}`;
          if (item.href) {
            summary += ` (${item.href})`;
          }
          summary += '\n';
        });
        summary += '\n';
      });

      return summary;
    },

    // 格式化结果显示
    formatResult(result) {
      if (typeof result === 'object') {
        return JSON.stringify(result, null, 2);
      }
      return result;
    },

    // POST 请求示例
    async postData() {
      this.postLoading = true
      this.result = null
      this.error = null

      try {
        // 示例：提交数据（实际使用时替换为真实API）
        const requestData = {
          name: '测试用户',
          email: 'test@example.com',
          message: '这是一条测试消息'
        }

        const response = await this.$http.post('/api/users/create', requestData)
        this.result = response
        this.$message.success('提交成功')
      } catch (err) {
        this.error = err.message || err
        this.$message.error('提交失败: ' + (err.message || '未知错误'))
      } finally {
        this.postLoading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.api-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.example-card,
.config-card {
  margin-bottom: 20px;
}

.result,
.error {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;

  h3 {
    margin-top: 0;
  }

  pre {
    background: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
    white-space: pre-wrap;
  }
}

.result {
  background: #f0f9ff;
  border: 1px solid #b3d9ff;
}

.error {
  background: #fef0f0;
  border: 1px solid #fbc4c4;
}

.config-card {
  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 10px 0;
      padding: 8px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
<template>
<div class="add-edit">
    <el-card class="box-card">
        <template v-slot:header>
                <my-breadcrumb>编辑文章</my-breadcrumb>
        </template>
        <div>
            <el-form ref='myform' :model="form" :rules="rules" label-width="40px" :hide-required-asterisk='true'>
                <el-form-item  label="标题" prop='title'>
                     <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item  label="内容" prop="content" >
                     <quill-editor v-model="form.content" :options="editorOption" @blur="quillFn" @change='quillFn' ></quill-editor>
                </el-form-item>
                <el-form-item  label="封面">
                  <!-- 这里的lable 就是单选框 的value值  -->
                      <el-radio-group v-model="form.cover.type" @change="changeCoverType">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                      </el-radio-group>
                      <!-- 有图 -->
                      <!-- 这个v-model就是images 就是图片路劲的一个数据 index 就是下标拿到当前点的那个imageurl -->
                      <div class="cover-box" v-if="form.cover.type > 0"  :key="form.cover.type">
                          <my-cover
                            v-for="(item, index) in form.cover.type"
                            :key="index"
                            v-model="form.cover.images[index]"
                          >
                          </my-cover>
                      </div>
                      <!-- 自动 -->
                      <!-- 这里的v-for 就是几个url就有几个组件  但比他长度多一  就能永远多点一个 -->
                      <div class="cover-box" v-if="form.cover.type === -1"  :key="form.cover.type">
                        <my-cover
                        v-for="(item, index) in (form.cover.images.length+1)"
                        :key="index"
                        v-model="form.cover.images[index]"
                        >
                        </my-cover>
                      </div>
                </el-form-item>
                <el-form-item  label="频道" prop="channel_id">
                    <my-channels v-model="form.channel_id"></my-channels>
                </el-form-item>
                <el-form-item  label="标题">
                     <el-button type="primary" @click='save(false)' >修改提交</el-button>
                     <el-button @click='save(true)'>存入草稿</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { addArticles, editArticlesId, editArticles } from '@/api/articles.js'
import { quillEditor } from 'vue-quill-editor'
import MyChannels from '@/components/my-channels.vue'
import MyCover from '@/components/my-cover.vue'
export default {
  name: 'add-edit',
  data () {
    return {
      form: {
        title: '',
        content: '',
        channel_id: '',
        cover: {
          type: 0,
          images: []
        }
      },
      channel: [],
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: ['blur', 'change'] },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: ['blur', 'change'] }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  // 表单校验

  components: {
    quillEditor,
    MyChannels,
    MyCover
  },
  created () {
    this.loadArticle(this.$route.params.id)
  },
  methods: {
    async loadArticle (id) {
      const res = await editArticlesId(id)
      console.log(res)
      this.form = res.data.data
    },
    // 修改文章
    save (draft) {
      this.$refs.myform.validate(async flag => {
        if (flag) {
          try {
            const res = await editArticles(this.$route.params.id, draft, this.form)
            this.$message.success('修改成功')
            this.$router.push('/articles')
            console.log(res)
          } catch (err) {
            this.$message.error('发布失败')
            console.log(err)
          }
        }
      })
    },
    // 校验富文本编辑器内容
    quillFn () {
      this.$refs.myform.validateField('content')
    },
    // 切换时记得重置
    changeCoverType () {
      this.form.cover.images = []
    }
  }
}

</script>

<style lang='less' scoped>
    .add-edit /deep/ .ql-editor{
        background-color:skyblue;
        min-height: 300px;
    }
    .add-edit /deep/ .ql-toolbar {
        padding: 0 8px;
    }
    .cover-box {
  display: flex;
  .my-cover {
    margin-right: 20px;
  }
}
</style>

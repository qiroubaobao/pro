<template>
  <div class="MIndex">
    <p class="user"><span>欢迎回来，张三</span><span>系统管理员</span><span>当前时间：2022-8-19 14:34</span></p>
    <div class="MState">
      <h3 class="item-flex"><span>库存状况</span><a-button size="large" type="primary">更多统计</a-button></h3>
      <div class="MGrid">
        <a-row :gutter="32">
          <a-col class="card" :span="6">
            <div class="card-total">
            <div class="item-flex">
              <span>标准物质库存总数</span>
              <span>单位/瓶</span>
            </div>
              <strong class="totalNum blue">4523</strong>
              <p>
                <span>全新：40</span>
                <span style="margin-left: 16px;">已开封：40</span>
              </p>
            </div>
          </a-col>
          <a-col :span="18">
            <a-row style="margin-bottom: 16px;" :gutter="[16,16]">
              <a-col :span="12">
                <a-card>
                  <div class="item-flex">
                    <span>即将过期<a-badge color="gold" style="margin-left: 10px;"/></span>
                    <a-button type="link">查看详情</a-button>
                  </div>
                  <div class="item-flex-start">
                    <strong class="totalNum">4523</strong>
                    <p>
                      <span>全新：40</span>
                      <span style="margin-left: 16px;">已开封：40</span>
                    </p>
                  </div>
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card>
                  <div class="item-flex">
                    <span>低于安全库存<a-badge color="red" style="margin-left: 10px;"/></span>
                    <a-button type="link">查看详情</a-button>
                  </div>
                  <div class="item-flex-start">
                    <strong class="totalNum">4523</strong>
                    <p>
                      <span>全新：40</span>
                      <span style="margin-left: 16px;">已开封：40</span>
                    </p>
                  </div>
                </a-card>
              </a-col>
            </a-row>
            <a-row :gutter="[16,16]">
              <a-col :span="12">
                <a-card>
                  <div class="item-flex">
                    <span>已经过期<a-badge color="red" style="margin-left: 10px;"/></span>
                    <a-button type="link">查看详情</a-button>
                  </div>
                  <div class="item-flex-start">
                    <strong class="totalNum">4523</strong>
                    <p>
                      <span>全新：40</span>
                      <span style="margin-left: 16px;">已开封：40</span>
                    </p>
                  </div>
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card>
                  <div class="item-flex">
                    <span>待归还<a-badge color="#2db7f5" style="margin-left: 10px;"/></span>
                    <a-button type="link">查看详情</a-button>
                  </div>
                  <div class="item-flex-start">
                    <strong class="totalNum">4523</strong>
                    <p>
                      <span>全新：40</span>
                      <span style="margin-left: 16px;">已开封：40</span>
                    </p>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MIndex'
  }
</script>

<style scoped lang="scss">
.MGrid .card{
  border: 1px solid #f0f0f0;
}
.card-total{
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  text-align: left;
  flex: 1;
  & .totalNum{
    display: flex;
    flex: auto;
    align-items: center;
  }
}
.item-flex, .item-flex-start {
  display: flex;
}
  .item-flex{
    justify-content: space-between;
  }
  .item-flex-start{
    justify-content: flex-start;
    align-items: center;
  }
  .totalNum{
    margin-right: 50px;
    font-size: 32px;
  }
  .blue{
    color: #1890ff;
  }
  .user{
    line-height: 50px;
    text-align: left;
    color: #999;
    & span{
      padding-right: 20px;
    }
  }
</style>

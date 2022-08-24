<template>
  <div class="management">
    <h1 align="left">管理工具</h1>
    <div class="box">
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-row :gutter="[16, 16]">
            <a-col :span="24">
              <div
                class="item item-big"
                @mouseover="getShow($event)"
                @mouseleave="getHide($event)"
              >
                <div class="item-info">
                  <div class="icon">
                    <frown-filled :style="{ fontSize: '60px' }" />
                  </div>
                  <div class="desc" align="left">
                    <h2 :style="{ fontSize: '20px' }">标准物质/标准品管理</h2>
                    <p>
                      描述 属性指定网格元素在网格布局中的大小和位置,
                      属性指定网格元素在网格布局中的大小和位置,
                      属性指定网格元素在网格布局中的大小和位置
                    </p>
                    <div class="msg">
                      <div>共 <span>46</span>个品类,<span>234</span>瓶</div>
                      <p>有四项未读预警</p>
                    </div>
                  </div>
                </div>
                <div :style="{ isShow }" class="item-shown" align="right">
                  <a-space>
                    <a-button>详情</a-button>
                    <a-button type="primary">进入</a-button>
                  </a-space>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-row :gutter="[16, 16]">
            <a-col :span="24">
              <div class="item">
                <div class="item-info">
                  <div class="icon">
                    <frown-filled :style="{ fontSize: '60px' }" />
                  </div>
                  <div class="desc" align="left">
                    <h2 :style="{ fontSize: '20px' }">化学试剂</h2>
                    <p>
                      描述 属性指定网格元素在网格
                    </p>
                    <p>
                      布局中的大小和位置
                    </p>
                  </div>
                </div>
                <div class="item-shown" align="right">
                  <a-space>
                    <a-button>详情</a-button>
                    <a-button type="primary">进入</a-button>
                  </a-space>
                </div>
              </div>
            </a-col>
            <a-col :span="24">
              <div class="item">
                <div class="item-info">
                  <div class="icon">
                    <frown-filled :style="{ fontSize: '60px' }" />
                  </div>
                  <div class="desc" align="left">
                    <h2 :style="{ fontSize: '20px' }">仪器设备</h2>
                    <div class="msg">
                      <div>共 <span>46</span>个品类,<span>234</span>瓶</div>
                      <p>有四项未读预警</p>
                    </div>
                  </div>
                </div>
                <div style="display: none" class="item-shown" align="right">
                  <a-space>
                    <a-button>详情</a-button>
                    <a-button type="primary">进入</a-button>
                  </a-space>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-row :gutter="[16, 16]">
            <a-col :span="24">
              <div class="item">
                <div class="item-info">
                  <div class="icon">
                    <frown-filled :style="{ fontSize: '60px' }" />
                  </div>
                  <div class="desc" align="left">
                    <h2 :style="{ fontSize: '20px' }">气瓶管理</h2>
                    <p>
                      描述 属性指定网格元素在网格
                    </p>
                    <p>
                      布局中的大小和位置
                    </p>
                  </div>
                </div>
                <div style="display: none" class="item-shown" align="right">
                  <a-space>
                    <a-button>详情</a-button>
                    <a-button type="primary">进入</a-button>
                  </a-space>
                </div>
              </div>
            </a-col>
            <a-col :span="24">
              <div class="item">
                <div class="item-info">
                  <div class="icon">
                    <frown-filled :style="{ fontSize: '60px' }" />
                  </div>
                  <div class="desc" align="left">
                    <h2 :style="{ fontSize: '20px' }">库位/环境监控</h2>
                    <div class="msg">
                      <div>共 <span>46</span>个品类,<span>234</span>瓶</div>
                      <p>有四项未读预警</p>
                    </div>
                  </div>
                </div>
                <div style="display: none" class="item-shown" align="right">
                  <a-space>
                    <a-button>详情</a-button>
                    <a-button type="primary">进入</a-button>
                  </a-space>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-row :gutter="[16, 16]">
            <a-col :span="24">
              <a-row :gutter="16">
                <a-col :span="12">
                  <div class="item">
                    <div class="item-info">
                      <div class="icon">
                        <frown-filled :style="{ fontSize: '60px' }" />
                      </div>
                      <div class="desc" align="left">
                        <h2 :style="{ fontSize: '20px' }">供应商管理</h2>
                        <p>
                          56家
                        </p>
                      </div>
                    </div>
                    <div style="display: none" class="item-shown" align="right">
                      <a-space>
                        <a-button>详情</a-button>
                        <a-button type="primary">进入</a-button>
                      </a-space>
                    </div>
                  </div>
                </a-col>
                <a-col :span="12">
                  <div class="item">
                    <div class="item-info">
                      <div class="icon">
                        <frown-filled :style="{ fontSize: '60px' }" />
                      </div>
                      <div class="desc" align="left">
                        <h2 :style="{ fontSize: '20px' }">人员管理</h2>
                        <p>56人</p>
                        <p>
                          敬请期待
                        </p>
                      </div>
                    </div>
                    <div style="display: none" class="item-shown" align="right">
                      <a-space>
                        <a-button>详情</a-button>
                        <a-button type="primary">进入</a-button>
                      </a-space>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="24">
              <div class="item">
                <div class="item-info">
                  <div class="icon">
                    <frown-filled :style="{ fontSize: '60px' }" />
                  </div>
                  <div class="desc" align="left">
                    <h2 :style="{ fontSize: '20px' }">标准/证书管理</h2>
                    <div class="msg">
                      <p>敬请期待</p>
                    </div>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="24">
          <div class="hd-box">
            <a-row>
              <a-col :span="4">
                <div class="hardware">
                  <a-badge count="5">
                    <a-avatar shape="square" size="large" />
                  </a-badge>
                  <h1>智能硬件管理</h1>
                </div>
              </a-col>
              <a-col :span="20">
                <a-row :gutter="16">
                  <a-col :span="4">
                      <div class="hd-item">
                        <div class="hd-badge">
                          <a-badge count="5">
                            <a-avatar shape="square" size="large" />
                          </a-badge>
                          <a-badge
                            class="hd-status"
                            count="未绑定"
                            :number-style="{
                              backgroundColor: '#fff',
                              color: '#999',
                              boxShadow: '0 0 0 1px #d9d9d9 inset'
                            }"
                          />
                        </div>
                        <h3 class="hd-title">温温度传感器</h3>
                      </div>
                      <a-tag class="hd-tag" color="#87d068">已授权</a-tag>
                  </a-col>
                  <a-col :span="4">
                    <div class="hd-item">
                      <div class="hd-badge">
                        <a-badge count="5">
                          <a-avatar shape="square" size="large" />
                        </a-badge>
                        <a-badge
                          class="hd-status"
                          count="未绑定"
                          :number-style="{
                              backgroundColor: '#fff',
                              color: '#999',
                              boxShadow: '0 0 0 1px #d9d9d9 inset'
                            }"
                        />
                      </div>
                      <h3 class="hd-title">温温度传感器</h3>
                    </div>
                    <a-tag class="hd-tag" color="#87d068">已授权</a-tag>
                  </a-col>
                  <a-col :span="4">
                    <div class="hd-item">
                      <div class="hd-badge">
                        <a-badge count="5">
                          <a-avatar shape="square" size="large" />
                        </a-badge>
                        <a-badge
                          class="hd-status"
                          count="未绑定"
                          :number-style="{
                              backgroundColor: '#fff',
                              color: '#999',
                              boxShadow: '0 0 0 1px #d9d9d9 inset'
                            }"
                        />
                      </div>
                      <h3 class="hd-title">温温度传感器</h3>
                    </div>
                    <a-tag class="hd-tag" color="#87d068">已授权</a-tag>
                  </a-col>
                  <a-col :span="4">
                    <div class="hd-item">
                      <div class="hd-badge">
                        <a-badge count="5">
                          <a-avatar shape="square" size="large" />
                        </a-badge>
                        <a-badge
                          class="hd-status"
                          count="未绑定"
                          :number-style="{
                              backgroundColor: '#fff',
                              color: '#999',
                              boxShadow: '0 0 0 1px #d9d9d9 inset'
                            }"
                        />
                      </div>
                      <h3 class="hd-title">温温度传感器</h3>
                    </div>
                    <a-tag class="hd-tag" color="#87d068">已授权</a-tag>
                  </a-col>
                  <a-col :span="4">
                    <div class="hd-item">
                      <div class="hd-badge">
                        <a-badge count="5">
                          <a-avatar shape="square" size="large" />
                        </a-badge>
                        <a-badge
                          class="hd-status"
                          count="未绑定"
                          :number-style="{
                              backgroundColor: '#fff',
                              color: '#999',
                              boxShadow: '0 0 0 1px #d9d9d9 inset'
                            }"
                        />
                      </div>
                      <h3 class="hd-title">温温度传感器</h3>
                    </div>
                  </a-col>
                  <a-col :span="4">
                    <div class="hd-item">
                      <div class="hd-badge">
                        <a-badge count="5">
                          <a-avatar shape="square" size="large" />
                        </a-badge>
                        <a-badge
                          class="hd-status"
                          count="未绑定"
                          :number-style="{
                              backgroundColor: '#fff',
                              color: '#999',
                              boxShadow: '0 0 0 1px #d9d9d9 inset'
                            }"
                        />
                      </div>
                      <h3 class="hd-title">温温度传感器</h3>
                    </div>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue"
import { FrownFilled } from "@ant-design/icons-vue"

export default defineComponent({
  name: "ManagementTool",
  components: {
    FrownFilled
  },
  setup() {
    let isShow = ref(false)

    const getShow = e => {
      console.log(e.currentTarget)
      console.log(e.currentTarget.lastElementChild)
    }
    const getHide = () => {
      isShow.value = false
    }

    return {
      getShow,
      getHide,
      isShow
    }
  }
})
</script>

<style scoped lang="scss">
.management {
  padding-top: 16px;
}
.box > .ant-row {
  margin-bottom: 16px;
}
.item {
  position: relative;
  background-color: #fff;
  min-height: 130px;
}
.item-big {
  height: 276px;
}
.item-info {
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & .icon {
    min-width: 150px;
    text-align: center;
  }
  & p {
    margin-bottom: 0;
    color: #7f7f7f;
  }
}
.msg {
  margin-top: 16px;
}
.item-shown {
  position: absolute;
  bottom: 0;
  padding-right: 20px;
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 80px;
  line-height: 80px;
}
.hd-box {
  width: 100%;
  background-color: #fff;
  padding: 30px 30px 30px 0;
}
.hd-item,
.hardware,
.hd-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
}
.hd-item {
  justify-content: flex-start;
  border: 1px solid #7f7f7f;
  width: auto;
  & .hd-badge {
    justify-content: center;
    flex: auto;
  }
}
.hd-title {
  margin-bottom: 0;
  width: 100%;
  background-color: #f0f0f0;
  line-height: 40px;
  flex-basis: 40px;
}
.hd-tag {
  position: absolute;
  top: 0;
  left: 8px;
}
.hd-status {
  position: absolute;
  right: 20px;
  bottom: 60px;
}
.hardware {
  justify-content: space-evenly;
}
</style>

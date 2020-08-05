<template>
  <div class="menu-content">
     <div class="menu">
       <div class="menu-item" :class="{'active':item.checked}" v-for="(item,index) in menuList" @click="checked(item,index)">
          <i :class="item.iconClass" :key="index"></i>
          <span class="menu-item-text">
            {{item.text}}
          </span>
       </div>
     </div>
    <div class="history">
      &nbsp&nbspHistory:
      <ul class="history-ul">
        <li v-for="agent in agentsList" :key="agent.id" class="history-li " @click="">
          {{agent.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
      props:{
        agentsList:{
            type:Array,
            default:[],
        }
      },
    data(){
        return{
            menuList:[
              {iconClass:'icon-dashboard',text:'DASHBOARD',checked:false},
              {iconClass:'icon-sitemap',text:'AGENT',checked:false},
              {iconClass:'icon-boat',text:'MY CRUISE',checked:false},
              {iconClass:'icon-life-bouy',text:'HELP',checked:false},
            ]
        }
    },
    methods:{
      checked(item,index){
          const {checked = false ,...other} = item
          this.menuList = this.menuList.map(el=>{
            el.checked = false
            return el
          })
           this.menuList[index].checked = true
      }
    },
    mounted(){

    }
  }
</script>
<style scoped>
  .menu-content{
    height:100%;
    position: relative;
    overflow: hidden;
  }
  .menu{
    display: flex;
    flex-direction: column;
  }
  .menu-item{
    color: white;
    font-family: "Avenir,Helvertical,Arial,sans-serif";
    height: 45px;
    line-height:45px;
    font-size: 14px;
    padding: 5px 0px 5px 30px;
    cursor: pointer;
  }

  .menu-item:hover{
    color:#00B4CF;
    background: #435466;
  }
  .menu-item.active{
    color:#00B4CF;
    background: #435466;
  }
  .menu-item i{
    font-size:20px;
  }
  .menu-item-text{
    padding-left: 10px;
  }
  .history{
    color:#ccc;
    font-size: 24px;
    position: absolute;
    bottom: 20px;
  }
  .history-ul{
    padding-left: 30px;
  }
  .history-li{
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999;
    font-size: 12px;
    padding: 5px;
    cursor: pointer;
    width: 95%;
  }
  .history-li:hover{
    color: #00B4CF;
  }
</style>



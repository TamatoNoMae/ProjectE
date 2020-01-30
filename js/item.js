new Vue({
    el: '#main',
    data: function() {
      return { 
        //用于判断缩略图是否位移
        isSlide:false,
        //缩略图位移
        listStyle:{
          'top': '0px'
        },
        listTop:0,
        //用于控制缩略图栏上下箭头的不透明度
        pointStyle:{
          'opacity':0
        },
        //类似于线程锁，防止快速移入移出产生问题，但是仍有BUG
        synKey:false,
        //商品参数表格所需的数据
        tableData: [{
          attr:'品牌',
          value:'松本商事',
        }, {
          attr:'预计发售',
          value:'2020年三月内'
        }, {
          attr:'预售截单日',
          value:'2020年2月4日'
        }, {
          attr:'适用年龄',
          value:'15周岁以上'
        }]
      }
    },
    methods:{
      //控制缩略图滚动
      slideDown:function(){
        var timer = setInterval(() => {
          this.listTop+=this.isSlide?5:-5;
          this.listStyle['top']=this.listTop+"px";
          if(this.listTop<=-650&&!this.isSlide||this.listTop>=0&&this.isSlide){
            clearInterval(timer);
            this.isSlide=!this.isSlide;
          }
        }, 1)
      },
      //鼠标移入时显示上下箭头
      showPoint:function(){
        if(!this.synKey)
          var timer = setInterval(() => {
            this.pointStyle['opacity']+=0.01;
            if(this.pointStyle['opacity']>=1){
              clearInterval(timer);
              this.synKey=true;
            }
          }, 1)
      },
      //移出时使上下箭头消失
      movePoint:function(){
        if(this.synKey)
          var timer = setInterval(() => {
            this.pointStyle['opacity']-=0.01;
            if(this.pointStyle['opacity']<=0){
              clearInterval(timer);
              this.synKey=false;
            }
          }, 1)
      }
    }
  })
<template>
  <div>
    <div class="movebox" ref="movebox">
      <div class="movego" ref="movego"></div>
      <div class="txt" ref="txt">将滑块拖拽到最右边</div>
      <div class="move moveBefore" ref="move" @mousedown="onMouseDown"></div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'Slider',
    props:{
      onSliderOk: {type:String,default:"onSliderOk"}
    },
    data(){
      return{
        canDrag: false,
        x0: 0,
        endx:0,
      }
    },
    mounted(){
      let _this=this;
      let $move=this.$refs.move;
      let $movebox=this.$refs.movebox;
      let $movego=this.$refs.movego;
      let $txt=this.$refs.txt;
      let maxLeft=$movebox.clientWidth-$move.clientWidth;
      document.onmousemove=function(e){
        if(!_this.canDrag) return;
        let endx= e.clientX - _this.x0;
        $move.className = 'move moveBefore';
        $move.style.left = endx+ 'px';
        $movego.style.width = endx + 'px';
        $txt.innerHTML = '将滑块拖拽到最右边';
        //临界值小于
        if (endx <= 0) {
          endx = 0;
          $move.style.left = 0;
          $movego.style.width = 0;
        }
        //临界值大于
        if (endx >= maxLeft) {
          endx=maxLeft;
          $move.style.left = maxLeft + 'px';
          $movego.style.width = maxLeft + 'px';
          $txt.innerHTML = '验证通过';
          $move.className = 'move moveSuccess';
          _this.canDrag=false;
          _this.Bus.$emit(_this.onSliderOk);
        }
        _this.endx=endx;
      };
      document.onmouseup = function (e) {
        let endx=_this.endx;
        if (endx > 0 && endx < maxLeft){
          $move.style.left = 0;
          $movego.style.width=0;
        }
        _this.canDrag=false;
      };
    },
    destroyed() {
      document.onmousemove = null;
      document.onmousedown = null;
    },
    methods: {
      slideStatuss() {
        this.Bus.$emit(this.slideStatus, true)
      },
      onMouseDown(e){
        let $move=this.$refs.move;
        this.canDrag=true;
        this.x0= e.clientX - $move.offsetLeft;
      },
      reset(){
        let $move=this.$refs.move;
        let $movego=this.$refs.movego;
        let $txt=this.$refs.txt;
        $move.style.left=0;
        $move.className = 'move moveBefore';
        $movego.style.width=0;
        $txt.innerHTML="将滑块拖拽到最右边";
      },
    },
  }
</script>

<style scoped lang="stylus">
  @import "../../stylus/base.styl";
  .movebox
    position relative;
    background-color #e8e8e8
    width 320px
    height 40px
    line-height 40px
    text-align center
    border-radius 2px
    overflow hidden
    .txt
      position absolute
      top 0
      width 100%
      font-size 14px
      color $col999
      -moz-user-select none
      -webkit-user-select none
      user-select none
      -o-user-select none
      -ms-user-select none
    .movego
      background-color #FFF3EB
      height 40px
      width 0
    .move
      position absolute
      top 0
      left 0
      width 50px
      height 40px
      cursor move
    .moveBefore
      background #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAoCAYAAAHLdZnaAAAAAXNSR0IArs4c6QAAAldJREFUWAntWTFOAzEQ9IUI0YQyD4AGCYkSaiT+AE/hCbyCmgcgKiRqWiQ+kRIkBIhwZLisY5/X3r3YOaGQK2Lf7nhmd+2LL05V3+2fm+/6xjDXIOYAdsAMsKblnVV9u1dbHqcTpVw4zh4dvBvh06Uxu4fWObS9yYPtohMV91Ctm4U+OYYj6kXbcNDXawMenzatEy+xFAqP6BJtZ6UwnwQ7XAUHRModV0CpW2slHhLNw/2JMTQ389xCBYBfnhs3wLnrK1SYS8eazgM6z3RMOWXvHFWKLOb7QyLM4uIWXF4mWJC4XDHO1qCCT325sKjxDepenM31z/vy6gLRzth/UjgbQ04mWYSQGa2+XJkinxnjVUNRro8ZcluFXhKEcq1UAHH1NidLFkE/7D9lUm2FdeFsIcpa5HKNDoLd2nA2Sxl2ZBHs9O8TX4izhdzWIosAypFyNkvrd3QiJHR05Y+GUNvmI37v9CLYsGijIiLORj6n1YlwZJzNIXa7sghHxtlc1lZ/vTatVnLlb+U5KaC5PiK97PEFKi5SYEpW/h4hRlEA0MvaKhCnSLFJRCxRz4DNjNiC45cjNuLWQY31U0eLI3zHNn9G8NKFdyS8XqYS0uI6JkDw/ESISRuoFke8yrZcIiSoDVSLI16hLZ8IBPE8HF83xzytM0svHi3OG8TflE2EHmgcJeG5iSWhxfExs9YyiWgD0+LYUNPG/J8kOImfvhlTT9NKWlyaJepd/L8ThQgO+jNGgBktTuKJ+MssrQh5n+ZNIn1WW6O1RjMyqC5mGa/83FxT1RzMD4Ektf1dYbI5AAAAAElFTkSuQmCC") no-repeat center;
    .moveSuccess
      background #FFF3EB url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAAAXNSR0IArs4c6QAAAlJJREFUOBGNVDFrFEEU/t7exUINiRIxWgjmTiGleIigoI1FuBCjEEsLe8tYiEUKsfB+gY0E0SaCRrlgoY1go5x1ELIWQuSCSAwBFWN2fN/bnb3bza2XKWb2vfneN2/ffG8AHW5p7BNXsQ+Hk2Zwcs0xx9WG7j4pm6c0iMBcfzch/Mjg1A6INcTBM7akk2tWZ1yzsulapwfolHwoSnI1Jvcx47eBbfesbPbIOeDQBWD5npmacuU+nJv1YJn8LHFKbi7A0qNtv5FZRRpSD2/p4dUZIFrIbHqjPAicuGlHaULuofl5/vCpGEIAk9MqdPLhf7XX/3iSnqtIaDly072qXOHvZYAE1MMqfR0gmdfW5+FkSsv2FS64I5MrT31g/Ne5cvhNW+vXSyJzkfQ8MoPUY7WOwY68ukHnX5jFEmbvKw96dzn2SHS3A7zU6sDI5EH0OjkaXzaN1zWA4F+rWRD3xL2kAFZUABXahWP0wJ7AF7QQRFHUPm51Ct6LWdUpE+FzkqRAz2h1jdDom45erzbQrCfy8SlhXtQesKs10TaxYl229mO5b0ZFzANDwNaGMmnGh4fHg1iAfaqdJ2Of8I7ZKyTj4I2pmMumZiSPzN5jwJEJYFXBv9sxsHsm0dnHwPf3O7VgpDIVWGv4oJ9fgPABsF/lQRF1dy4zYntTeclr4sPSVdvs/2/EvuPAxTfAhxvAt7dpXPFHcM1ueTctWEyS7CRatKYyLWmD6001+gbmAYzh41AkbOJNSu2NaUg0rWaNXWo8fIqAlj5HixgdWmQLmb9r+gcsdOl+oRrZeQAAAABJRU5ErkJggg==") no-repeat center;
      pointer-events none

</style>

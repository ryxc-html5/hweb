<style scoped>

</style>
<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" :id="mid" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="">{{title}}</h4>
          </div>
          <div class="modal-body">
            <slot name="content"></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关 闭</button>
            <slot name="btn"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default{
    props:{
      mid:{
        type: String,
        default: "myModal"
      },
      title:{
        type: String,
        default: "myModal"
      }
    },
    data(){
      return {

      }
    },
    components: {

    }
  }
</script>

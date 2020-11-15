<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            default header
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            default body
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            default footer
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {

}
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 600px;
    margin: 0px auto;
    /* padding: 20px 30px; */
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}

.modal-header h3 {
    padding: 20px 25px;
    color: white;
    border-radius: 12px 12px 0 0;
    background-color:#7679f3;
}

.modal-body {
    margin: 20px 0;
    width : 90%;
}

.modal-body .span-input-set {
    width: 100%;
    height: 3vh;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 2.5vh 0 0 1.5vw;
}

.modal-body .span-input-set span {
    width: 20%;
}

.modal-body .span-input-set .items {
    width:75%; 
    display:flex; 
    flex-flow:row nowrap; 
    justify-content: flex-start; 
    align-items: center;
}

.modal-footer {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    margin-right: 5px;
}

.modal-footer * {
    margin: 10px 5px;
}

.modal-footer .cancel {
    border: 0 white;
    background-color: white;
}

.modal-default-button {
    float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
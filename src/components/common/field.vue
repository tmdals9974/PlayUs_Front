<template>
    <div class="vertical-line">
        <div style="display:flex; flex-flow:row nowrap">
            <div class="horizontal-line"></div>
            <div class="h6-like new-field">
                <div class="vertical-span-item-set">
                    <span>필드</span>
                    <input type="text" class="item h6-like" v-model="fieldName">
                </div>
                <span style="padding : 35px 10px;">=</span>
                <div class="vertical-span-item-set">
                    <span>타입</span>
                    <select class="item h6-like" v-model="fieldType">
                        <option selected>String</option>
                        <option>Number</option>
                        <option>Boolean</option>
                        <option>Array</option>
                        <option>Date</option>
                        <option>Map</option>
                    </select>
                </div>
                <div class="vertical-span-item-set" style="margin-left:5px">
                    <span>기본값</span>
                    <input type="text" class="item h6-like" v-model="fieldDefault">
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fieldName: '',
            fieldType: 'String',
            fieldDefault: ''
        }
    }
}
</script>

<style scoped>

</style>
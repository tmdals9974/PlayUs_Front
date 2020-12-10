<template>
    <div class="vertical-line">
        <div style="display:flex; flex-flow:row nowrap">
            <div class="horizontal-line"></div>
            <div class="h6-like new-field">
                <div class="vertical-span-item-set">
                    <span>필드</span>
                    <input type="text" class="item h6-like" v-model="fieldName" @blur="nameChange()">
                </div>
                <span style="padding : 35px 10px;">=</span>
                <div class="vertical-span-item-set">
                    <span>타입</span>
                    <select class="item h6-like" v-model="fieldType" @change="typeChange()">
                        <option selected>String</option>
                        <option>Number</option>
                        <option>Boolean</option>
                        <option>Array</option>
                        <option>Object</option>
                    </select>
                </div>
                <div class="vertical-span-item-set" style="margin-left:5px" v-show="defaultInputShow">
                    <span>기본값</span>
                    <input type="text" class="item h6-like" v-model="fieldDefault" ref="default" @blur="defaultChange()" :placeholder="defaultPlaceholder">
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['num'],
    data() {
        return {
            fieldName: '',
            fieldType: 'String',
            fieldDefault: '',
            typeCheck: false,
            defaultPlaceholder: '',
            defaultInputShow: true,
        }
    },
    methods: {
        typeChange() {
            this.fieldDefault = "";
            switch (this.fieldType) {
                case 'Boolean':
                    this.defaultPlaceholder = "true / false";
                    this.defaultInputShow = true;
                    break;
                case 'Array':
                case 'Object':
                    this.defaultPlaceholder = "";
                    this.defaultInputShow = false;
                    break;
                default:
                    this.defaultPlaceholder = "";
                    this.defaultInputShow = true;
                    break;
            }
            this.$emit('typeChange', this.num, this.fieldType);
        },
        defaultChange() {
            if (this.fieldDefault == '') return;

            switch (this.fieldType) {
                case 'String':
                    this.typeCheck = true;
                    break;
                case 'Number':
                    if (isNaN(parseInt(this.fieldDefault)))
                        return this.notMatchDefault();
                    this.typeCheck = true;
                    break;
                case 'Boolean':
                    if (!(this.fieldDefault.toLowerCase() == 'true' || this.fieldDefault.toLowerCase() == 'false'))
                        return this.notMatchDefault();
                    this.typeCheck = true;
                    break;
                default:
                    this.typeCheck = false;
                    break;
            }
            if (this.typeCheck)
                this.$emit('defaultChange', this.num, this.fieldDefault);
        },
        notMatchDefault() {
            alert('기본값이 설정된 타입과 일치하지 않습니다.');
            this.typeCheck = false;
            setTimeout(() => this.$refs.default.focus(), 10);
        },
        nameChange() {
            this.$emit('nameChange', this.num, this.fieldName);
        }
    },
}
</script>

<style scoped>
.vertical-span-item-set input[type="text"]:disabled {
    background-color: gainsboro;
}
</style>
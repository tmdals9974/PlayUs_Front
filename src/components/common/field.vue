<template>
    <div class="vertical-line">
        <div style="display:flex; flex-flow:row nowrap">
            <div class="horizontal-line"></div>
            <div class="h6-like new-field">
                <div class="vertical-span-item-set">
                    <span>필드명</span>
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
                    <span style="display:flex">기본값&nbsp;
                        <input type="checkbox" :id="'useDefault' + num" v-model="useDefault" @change="defaultCheck()">
                        <label class="checkbox_border" :for="'useDefault' + num"></label> 
                    </span>
                    <input type="text" class="item h6-like" v-model="fieldDefault" ref="default" @blur="defaultChange()" :placeholder="defaultPlaceholder" :disabled="!useDefault">
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
            fieldDefault: undefined,
            typeCheck: false,
            defaultPlaceholder: '',
            defaultInputShow: true,
            useDefault: false
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
        },
        defaultCheck() {
            this.fieldDefault = this.useDefault ? '' : undefined;
            this.$emit('defaultChange', this.num, this.fieldDefault);
        }
    },
}
</script>

<style scoped>
.vertical-span-item-set input[type="text"]:disabled {
    background-color: gainsboro;
}

label.checkbox_border {
    border: 1px solid #707070;
    border-radius: 4px;
    padding-left: 17px;
    height: 17px;
    display: inline-block;
    align-self: center;
    margin-left: 5px;
    background-size: contain;
    cursor: pointer;
}

input[type="checkbox"]:checked + label.checkbox_border {
    background-image: url('../../assets/images/checked_checkbox.png');
}
</style>
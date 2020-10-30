<template>
    <main>
        <input type="text" id="projectName" placeholder="이름"/>
        <input type="radio" name="returnType" value="0" checked/> JSON
        <input type="radio" name="returnType" value="1"> XML
        <input type="checkbox" id="lock"/>
        <label for="lock">잠금모드 활성화</label>
        <input type="button" value="send" @click="postTest()">
    </main>
</template>

<script>
export default {
    methods: {
        postTest() {
            var name = document.querySelector('#projectName').value;
            var returnType = document.querySelector('[name="returnType"]:checked').value;
            var lock = document.querySelector('#lock').checked;
            this.$http.post('projects', {name, returnType, lock})
            .then(result => {
                console.log(result);
            })
        }
    }
    
}
</script>

<style>

</style>
<template>
    <div class="trivia-question">
        <div class="question-prompt" v-text="trivia.question"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ITrivia} from "@/types";

    @Component
    export default class TriviaQuestion extends Vue {
        @Prop({required: true}) private trivia!: ITrivia;

    }
</script>

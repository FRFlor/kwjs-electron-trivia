<template>
    <div class="trivia-question">
        <div class="question-prompt" v-text="trivia.question"/>
        <button class="possible-answer"
                v-for="(answer, index) in possibleAnswers"
                :key="index"
                v-text="answer"
                :content="answer"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ITrivia} from "@/types";

    @Component
    export default class TriviaQuestion extends Vue {
        @Prop({required: true}) private trivia!: ITrivia;

        private get possibleAnswers(): string[] {
            const possibleAnswers = [...this.trivia.incorrect_answers];
            const indexOfRightAnswer: number = Math.floor(Math.random() * possibleAnswers.length);
            possibleAnswers.splice(indexOfRightAnswer, 0, this.trivia.correct_answer);

            return possibleAnswers;
        }
    }
</script>

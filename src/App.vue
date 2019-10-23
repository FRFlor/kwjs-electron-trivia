<template>
    <div id="app">
        <trivia-question :trivia="question"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import TriviaQuestion from "@/components/TriviaQuestion.vue";
    import {ITrivia} from "@/types";

    @Component({
        components: {
            TriviaQuestion
        },
    })
    export default class App extends Vue {
        private question: ITrivia = {
            category: "Movies",
            correct_answer: "Movie that is correct",
            difficulty: "Easy",
            incorrect_answers: [
                "Wrong Movie 1",
                "Wrong Movie 2",
                "Wrong Movie 3",
            ],
            question: "What is the right movie?",
            type: "Multiple-choice",
        };
    }
</script>

<style lang="scss">
    #app {

    }
</style>

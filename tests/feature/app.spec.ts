import {Wrapper, mount} from "@vue/test-utils";
import App from "@/App.vue";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import flushPromises from "flush-promises";
import * as TriviaResponseJson from "../fixtures/TriviaGetResponse.json";
import {ITriviaGetResponse} from "@/types/ITriviaGetResponse";

describe("App", () => {
    let wrapper: Wrapper<App>;
    let mockTriviaApi: MockAdapter;
    const triviaResponse: ITriviaGetResponse = TriviaResponseJson;

    beforeEach(async () => {
        mockTriviaApi = new MockAdapter(axios);
        mockTriviaApi
            .onGet("https://opentdb.com/api.php?amount=10&type=multiple&encode=base64")
            .reply(200, triviaResponse);

        wrapper = mount(App);
        await flushPromises();
    });

    it("Starts with the first question from the api fully decoded", () => {
        expect(wrapper.text()).toContain(atob(triviaResponse.results[0].question));
    });
});

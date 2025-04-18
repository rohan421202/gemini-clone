import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY; // Ensure this is set correctly


const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        console.log("Result from API:", result); // Log the result from the API

        if (result && result.response) {
            console.log("Valid response received"); // Log if response is valid

            return result.response.text(); // Ensure response is valid
        } else {
            throw new Error("Invalid response from API");
        }
    } catch (error) {
        console.error("Error in run function:", error);
        return "An error occurred while processing your request."; // User-friendly error message
    }
}

export default run;

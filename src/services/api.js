import axios from 'axios';
export const generateSnippet = async (prompt) => {
    try {
        console.log("TRACK DATA", prompt);

        // Define the payload structure
        const payload = {
            code_topic: prompt
        };

        // Make the POST request to the API Gateway
        const response = await axios.post(
            'https://93kbprlh67.execute-api.us-east-1.amazonaws.com/dev/task-description',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extract the code from response.data.generated_code using a regex pattern
        const generatedCode = response.data.generated_code;
        console.log("GENEREATED CODE TRACK DATA " , generatedCode);
        const codeMatch = generatedCode.match(/<code>([\s\S]*?)<\/code>/);

        if (codeMatch && codeMatch[1]) {
            const extractedCode = codeMatch[1];
            console.log("Extracted Code:", extractedCode);
            return extractedCode; // Return the extracted code
        } else {
            return response.data.generated_code;
        }
    } catch (error) {
        console.error("Error generating snippet:", error);
        throw error;
    }
};
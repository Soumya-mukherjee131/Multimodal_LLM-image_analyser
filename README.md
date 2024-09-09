LINk - https://multimodal-llm-image-a-git-51b670-soumyadip-mukherjees-projects.vercel.app/

-> Project title- Toolthat used multimodal_LLM to describe testing instructions for any digital product's features, based on the screenshots.

-> Description- In this application user need to upload the image or images and then give a description to the multimodal LLM 
and then AI will return a text based answer according to the given description. ANyone can analyse any type of images and gather informations about it very easily.

-> How to Install and Run the Project: for both type of users -
  1) If you want to test or use this application you can directly go to this link and use it. It is completely free to use.
  2) For those who want to build this project You can copy the github repository and do it in vs code but you need to write and connect the cloud on your own there which might be difficult
   because API_KEY has limitation to tests and for the images you need a cloud platform to upload them and then fetch the images url to the backend and give it to the AI model to analyse.
   
   Recomended way- so it is better to use a cloud platform where we just need to configure the LLM model with our code.
   Use idx.google.com directly and click on geminiAI becasue the LLM model we are using is GEMINIAI LLM model for vision then give a name and click on create.
   IT will automatically set up the directories and instll node modules and then youjust need to write the code and add files as per your need.
   As i dont have much time i keep this application very simple to process in future i will modify it with some more existing features where we can see the images that are uploaded,
   our propmpts and and some unique visual representation etc.
   
-> How to Use the Tool: very simple upload the image, give a description and click the button describe.

-> Prompting Strategy: i have used this prompting strategy in my code let contents = [
      {
        role: 'user',
        parts: [
          // Include all images in the prompt
          ...imageBase64Array.map(imageBase64 => ({ 
            inline_data: { mime_type: 'image/jpeg', data: imageBase64 } 
          })),
          // Add optional context
          { text: context }, 
          // Add prompt text (if needed)
          { text: promptInput.value },
          // Add instructions for test case generation
          {
            text: `Please generate test cases based on the provided screenshots and context. Each test case should include:

**Description:** What the test case is about.
**Pre-conditions:** What needs to be set up or ensured before testing.
**Testing Steps:** Clear, step-by-step instructions on how to perform the test.
**Expected Result:** What should happen if the feature works correctly.`
          }
        ]
      }
    ];

  and in the application i have used this prompt to AI to generate the description- 
  Describe the uploaded images according to the instruction and give a detailed, step-by-step guide on how to test each functionality- 
  Description: What the test case is about, Pre-conditions: What needs to be set up or ensured before testing, 
  Testing Steps: Clear, step-by-step instructions on how to perform the test, Expected Result: What should happen if the feature works correctly. 

  ->API Key Setup: Go to geminiAi and create your own api key there and use it in the application if you want to build your own.

  ->Screenshots: I have uploaded multiple screenshots of the application. Please check it out.

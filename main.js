import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Base64 from 'base64-js';
import MarkdownIt from 'markdown-it';
import './style.css';

// Replace with your actual API key
let API_KEY = process.env.GEMINIAI_API_KEY; 

let form = document.querySelector('form');
let promptInput = document.querySelector('#promptInput'); // Select by ID
let contextTextarea = document.querySelector('#context');
let output = document.querySelector('.output');

form.onsubmit = async (ev) => {
  ev.preventDefault();
  output.textContent = 'Generating test cases...';

  try {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files; 
    const context = contextTextarea.value;

    // Process all selected images
    
let imageBase64Array = await Promise.all(
      Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
          };
          reader.onerror = reject;
        });
      })
    );

    // Assemble the prompt
    let contents = [
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

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // or gemini-1.5-pro
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const result = await model.generateContentStream({ contents });

    let buffer = [];
    let md = new MarkdownIt();
    for await (let response of result.stream) {
      buffer.push(response.text());
      output.innerHTML = md.render(buffer.join(''));
    }
  } catch (e) {
    output.innerHTML += '<hr>' + e;
  }
};

import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines when creating the flashcards:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners, aged 13 and up.
5. Include a variety of questions types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both the questions and the answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. If given a body of text, extract the most important and relevant information for the flashcards.
9. Aim to create a balanced set of flashcards that covers the topic comprehensively.
10. Create no more than 10 flashcards.

Remember, the goal is to faciliate effective learning and retention of information through these flashcards.
Both front and back should be no more than 4 sentence long.

You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the flashcard",
      "back": "Back of the flashcard"
    }
  ]
}
`;

export async function POST(req) {
  //  OpenAI API call
  const openai = new OpenAI();
  const data = await req.text();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  // OpenAI API response

  // Parse the JSON response from the OpenAI API
  const flashcards = JSON.parse(completion.choices[0].message.content);

  // Return the flashcards as a JSON response
  return NextResponse.json(flashcards.flashcards);
}

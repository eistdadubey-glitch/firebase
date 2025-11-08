/**
 * @fileOverview A personalized style suggestion AI agent (MOCK VERSION for static export).
 */

import {z} from 'zod';

const PersonalizedStyleSuggestionsInputSchema = z.object({
  quizAnswers: z
    .string()
    .describe('Answers from the interactive style quiz.'),
  photoDataUri: z
    .string()
    .describe(
      'A photo of the user, as a data URI that must include a MIME type and use Base64 encoding.'
    ),
  bodyTypeDescription: z
    .string()
    .describe('Description of the user\'s body type.'),
});

export type PersonalizedStyleSuggestionsInput = z.infer
  typeof PersonalizedStyleSuggestionsInputSchema
>;

const PersonalizedStyleSuggestionsOutputSchema = z.object({
  styleSuggestions: z
    .string()
    .describe('Personalized clothing style suggestions.'),
});

export type PersonalizedStyleSuggestionsOutput = z.infer
  typeof PersonalizedStyleSuggestionsOutputSchema
>;

// Mock function for static export
export async function getPersonalizedStyleSuggestions(
  input: PersonalizedStyleSuggestionsInput
): Promise<PersonalizedStyleSuggestionsOutput> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Parse quiz answers to personalize the mock response
  const answers = input.quizAnswers.toLowerCase();
  const bodyType = input.bodyTypeDescription.toLowerCase();
  
  let styleSuggestions = `Based on your preferences, here are personalized style recommendations from Vastra's sustainable collection:\n\n`;
  
  // Add personalized suggestions based on quiz answers
  if (answers.includes('minimalist')) {
    styleSuggestions += `✨ Minimalist Essentials: Clean lines and neutral tones are your foundation. Try our organic cotton basics in soft whites and grays.\n\n`;
  } else if (answers.includes('bohemian')) {
    styleSuggestions += `✨ Bohemian Vibes: Flowing fabrics and earthy patterns suit you perfectly. Explore our hemp and linen collection with nature-inspired prints.\n\n`;
  } else if (answers.includes('classic')) {
    styleSuggestions += `✨ Timeless Classics: Invest in quality pieces that never go out of style. Our tailored collection in sustainable wool and organic cotton is perfect for you.\n\n`;
  } else if (answers.includes('trendy')) {
    styleSuggestions += `✨ On-Trend Sustainable: Stay current while being eco-conscious. Check out our latest seasonal pieces made from recycled materials.\n\n`;
  } else if (answers.includes('casual')) {
    styleSuggestions += `✨ Effortless Casual: Comfort meets style in our relaxed-fit collection. Soft organic fabrics for everyday wear.\n\n`;
  } else if (answers.includes('vintage')) {
    styleSuggestions += `✨ Vintage-Inspired: Retro silhouettes with modern sustainability. Our upcycled and vintage-style pieces are calling your name.\n\n`;
  }
  
  styleSuggestions += `🎨 Color Recommendations: `;
  if (answers.includes('neutrals')) {
    styleSuggestions += `Your neutral palette allows for versatility. Build a capsule wardrobe with our beige, navy, and cream pieces.\n\n`;
  } else if (answers.includes('earthy')) {
    styleSuggestions += `Earthy tones complement your style. Look for our terracotta, olive, and rust collections.\n\n`;
  } else if (answers.includes('pastels')) {
    styleSuggestions += `Soft pastels will enhance your look. Try our blush, mint, and lavender sustainable fabrics.\n\n`;
  } else if (answers.includes('bright')) {
    styleSuggestions += `Bold colors make a statement! Our vibrant, plant-dyed collection will suit you perfectly.\n\n`;
  }
  
  styleSuggestions += `👔 Fit & Style Tips: Based on your body type description, we recommend pieces that balance proportion and highlight your best features. Look for sustainable fabrics with natural stretch for comfort and flattering silhouettes.\n\n`;
  
  styleSuggestions += `🌱 Sustainability Note: All recommendations come from Vastra's ethically-sourced, eco-friendly collections. Each piece is designed to last, reducing fashion waste.\n\n`;
  
  styleSuggestions += `💡 Pro Tip: Start with 2-3 versatile pieces that can be mixed and matched. Quality over quantity is key to sustainable fashion!`;
  
  return { styleSuggestions };
}

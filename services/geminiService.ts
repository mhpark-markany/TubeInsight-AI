import { GoogleGenAI, Type, Schema } from "@google/genai";
import { VideoData, GroundingUrl, SummaryLength, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to extract YouTube Video ID to ensure accurate search
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Define the response schema strictly to ensure easy UI rendering
const videoAnalysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    videoTitle: { type: Type.STRING, description: "The exact title of the YouTube video." },
    channelName: { type: Type.STRING, description: "The name of the YouTube channel." },
    summary: { type: Type.STRING, description: "The summary of the video content." },
    views: { type: Type.INTEGER, description: "The approximate number of views for this specific video. If unknown, estimate based on search or put 0." },
    publishedDate: { type: Type.STRING, description: "The exact publish date in YYYY-MM-DD format (e.g. '2023-10-25'). If exact date is not found, convert relative time (e.g. '2 days ago') to approximate YYYY-MM-DD date." },
    keyTopics: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }, 
      description: "List of 5-7 key keywords or topics discussed in the video." 
    },
    timestamps: {
      type: Type.ARRAY,
      description: "Key moments in the video with their estimated timestamps.",
      items: {
        type: Type.OBJECT,
        properties: {
          time: { type: Type.STRING, description: "Time format like '01:30' or '12:45'" },
          description: { type: Type.STRING, description: "Brief description of what happens at this time." }
        },
        required: ["time", "description"]
      }
    },
    sentiment: { type: Type.STRING, description: "Overall sentiment of the video (e.g., Educational, Controversial, Positive, Entertaining)." },
    channelAnalysis: {
      type: Type.OBJECT,
      properties: {
        subscriberCount: { type: Type.STRING, description: "Approximate subscriber count." },
        contentStrategy: { type: Type.STRING, description: "A brief analysis of the channel's general content style and target audience." },
        totalViewsEstimate: { type: Type.STRING, description: "Total channel views estimate." },
        frequentTopics: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING }, 
          description: "List of 3-5 topics this creator frequently covers." 
        },
        successFactors: { type: Type.STRING, description: "Insight into what makes this creator's videos successful or unique." }
      },
      required: ["subscriberCount", "contentStrategy", "totalViewsEstimate", "frequentTopics", "successFactors"]
    },
    otherVideos: {
      type: Type.ARRAY,
      description: "A list of 3-5 other popular or recent videos from the same channel for comparison.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          views: { type: Type.INTEGER, description: "View count for this other video." },
          summary: { type: Type.STRING, description: "One sentence summary of this other video." }
        },
        required: ["title", "views", "summary"]
      }
    }
  },
  required: ["videoTitle", "channelName", "summary", "views", "publishedDate", "keyTopics", "timestamps", "sentiment", "channelAnalysis", "otherVideos"]
};

export const analyzeVideo = async (url: string, length: SummaryLength = 'medium', language: Language = 'en'): Promise<{ data: VideoData | null; sources: GroundingUrl[] }> => {
  try {
    const videoId = getYouTubeVideoId(url);
    
    let lengthInstruction = "";
    switch (length) {
      case 'short':
        lengthInstruction = "Keep the summary concise and brief, around 50 words.";
        break;
      case 'medium':
        lengthInstruction = "Provide a standard comprehensive summary, around 150-200 words.";
        break;
      case 'long':
        lengthInstruction = "Provide a very detailed and in-depth summary, around 300-400 words, covering all nuances.";
        break;
    }

    const languageInstruction = language === 'ko' 
      ? "IMPORTANT: Provide the response entirely in Korean (Hangul). This includes the summary, descriptions, channel strategy, success factors, key topics, and SENTIMENT (e.g., '긍정적', '교육적'). Translate everything naturally."
      : "Provide the response in English.";

    const prompt = `
      You are an expert YouTube video analyzer.
      Target Video URL: ${url}
      ${videoId ? `Target Video ID: ${videoId}` : ''}
      
      Your Task: Accurately analyze THIS specific video.
      
      **Execution Steps**:
      1. **Search**: Use Google Search to find the *exact* video by searching for the Video ID ("${videoId}") or the full URL.
      2. **Verify**: Ensure the title, views, and content you find match this specific video ID. Do not use general channel info for the video summary.
      3. **Analyze**:
         - **Summary**: Synthesize a clear summary from the search results (reviews, transcripts, descriptions). ${lengthInstruction}
         - **Timestamps**: Identify key moments.
         - **Metadata**: Find the **exact publish date** (convert to YYYY-MM-DD format) and view count.
         - **Channel**: Analyze the creator's broader strategy.
      
      **Language Requirement**: ${languageInstruction}
      
      Output strictly in JSON format matching the schema provided.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: videoAnalysisSchema,
      },
    });

    // Extract Text and Parse JSON
    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No data received from Gemini.");
    }
    
    const parsedData = JSON.parse(jsonText) as VideoData;

    // Extract Grounding Metadata (Sources)
    const sources: GroundingUrl[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks) {
      groundingChunks.forEach(chunk => {
        if (chunk.web?.uri && chunk.web?.title) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    return { data: parsedData, sources };

  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};

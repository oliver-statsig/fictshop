import Replicate from 'replicate';
import fs from 'fs';
import path from 'path';
import { products } from '../data/products';

// You'll need to set REPLICATE_API_TOKEN in your environment
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const generateImage = async (prompt: string, filename: string) => {
  const output = await replicate.run(
    //"zsxkib/mmaudio:4b9f801a167b1f6cc2db6ba7ffdeb307630bf411841d4e8300e63ca992de0be9",
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        prompt: `Professional product photography of ${prompt}, white background, high quality, 4k, commercial product shot`,
        negative_prompt: "text, watermark, low quality, blurry",
        width: 1024,
        height: 1024,
      }
    }
  );

  // The output will be an array with the image URL
  if (Array.isArray(output) && output.length > 0) {
    const imageUrl = output[0];
    // You'll need to implement downloading the image from the URL
    console.log(`Generated image for ${filename}: ${imageUrl}`);
  }
};

async function main() {
  // Create the public/images directory if it doesn't exist
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const productsToGenerate = products;
  
  for (const product of productsToGenerate) {
    console.log(`Generating image for ${product.name}...`);
    await generateImage(product.name, product.imageUrl.split('/').pop()!);
    // Add a delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

main().catch(console.error); 
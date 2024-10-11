import { promises as fs } from 'fs'; // Use promises to handle async file operations
import path from 'path'; // Safely handle file paths

// Define the API route handler
export default async function handler(req, res) {
  // Allow only GET requests
  if (req.method === 'GET') {
    try {
      // Get the full path to the json.json file in the public folder
      const filePath = path.join(process.cwd(), 'public', 'json.json');
      
      // Read the JSON file asynchronously (utf-8 ensures it's read as a string)
      const fileContents = await fs.readFile(filePath, 'utf-8');
      
      // Parse the file contents from JSON to JavaScript object
      const data = JSON.parse(fileContents);

      // Respond with the JSON data
      res.status(200).json(data);
    } catch (error) {
      console.error('Error reading the JSON file:', error);
      // Handle errors such as file not found
      res.status(500).json({ error: 'Failed to read the file' });
    }
  } else {
    // Handle unsupported request methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

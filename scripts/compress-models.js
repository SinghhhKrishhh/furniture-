const fs = require('fs');
const path = require('path');
const gltfPipeline = require('gltf-pipeline');
const processGltf = gltfPipeline.processGltf;
const processGlb = gltfPipeline.processGlb;

const modelsDir = path.join(__dirname, '../public/models');

async function compressModels() {
  if (!fs.existsSync(modelsDir)) {
    console.log('No models directory found.');
    return;
  }

  const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.glb') || f.endsWith('.gltf'));
  
  for (const file of files) {
    const filePath = path.join(modelsDir, file);
    const glb = fs.readFileSync(filePath);
    
    console.log(`Compressing ${file}...`);
    
    const options = {
      dracoOptions: {
        compressionLevel: 7
      }
    };

    try {
      if (file.endsWith('.glb')) {
        const results = await processGlb(glb, options);
        fs.writeFileSync(filePath, results.glb);
      } else {
        const gltf = JSON.parse(glb.toString());
        const results = await processGltf(gltf, options);
        fs.writeFileSync(filePath, JSON.stringify(results.gltf));
      }
      console.log(`Successfully compressed ${file}`);
    } catch (err) {
      console.error(`Error compressing ${file}:`, err);
    }
  }
}

compressModels();

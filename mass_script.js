const fs = require('fs');
const path = require('path');

const folderPath = 'C:/Users/Aless/Documents/AI/Face-Recognition-JavaScript/labeled_images'; // replace with the path to your folder

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const labels = [];

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      labels.push(file);
    }
  });

  console.log(labels); // prints the labels array
});

async function MassloadLabeledImages() {
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
  
        // Get a list of all image files in the labeled_images/label directory
        const imageFiles = await fs.promises.readdir(`labeled_images/${label}`);
  
        // Loop through each image file and extract face descriptors
        for (let i = 0; i < imageFiles.length; i++) {
          const img = await faceapi.fetchImage(`labeled_images/${label}/${imageFiles[i]}`);
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
  
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  }
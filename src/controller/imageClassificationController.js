const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

// Utility to delete the uploaded file
const deleteFile = (filePath) => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return;
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
    });
  });
};

const predictImage = (req, res) => {
  const imagePath = req.file.path;

  if (!imagePath) {
    return res.status(400).json({ error: 'Image path is missing.' });
  }

  console.log(imagePath);

  fs.readFile(imagePath, (err, imageData) => {
    console.log('Read the image file from disk')
    if (err) {
      console.error('Error reading image file:', err);
      deleteFile(imagePath);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const pythonProcess = spawn('python', ['scripts/imageClassification.py']);

    pythonProcess.stdin.write(imageData);
    pythonProcess.stdin.end();

    let prediction = '';
    let stderrOutput = ''; 
    let responded = false;

    pythonProcess.stdout.on('data', (data) => {
      prediction += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
    const stderrLine = data.toString();
    stderrOutput += stderrLine;
    console.warn('Python stderr:', stderrLine);

    const isFatal = /Traceback|Exception/i.test(stderrLine);

    if (isFatal && !responded) {
      deleteFile(imagePath);
      responded = true;
      res.status(500).json({ error: 'Model execution failed.', details: stderrOutput });
    }
    });

    pythonProcess.on('close', (code) => {
      deleteFile(imagePath);

      if (responded) return; 

      if (code !== 0) {
        console.error('Python script exited with code:', code);
        console.error('Python stderr:\n', stderrOutput);
        responded = true;
        return res.status(500).json({ error: 'Model execution failed.', details: stderrOutput });
      }

      try {
        const lines = prediction.trim().split('\n');
        const lastLine = lines[lines.length - 1];
        const parsed = JSON.parse(lastLine);

        responded = true;
        return res.status(200).json({ prediction: parsed });
      } catch (e) {
        console.error('Error parsing prediction:', e);
        console.error('Raw prediction output:\n', prediction);

        if (!responded) {
          responded = true;
          return res.status(500).json({ error: 'Failed to parse prediction result.' });
        }
      }
    });
  });
};

module.exports = {
  predictImage
};

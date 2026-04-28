import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

console.log('Starting preview server to generate index.html...');

const preview = spawn('npm', ['run', 'preview', '--', '--port', '4173', '--strictPort'], { stdio: 'inherit', shell: true });

setTimeout(() => {
  http.get('http://localhost:4173/', (res) => {
    let data = '';
    
    res.on('data', chunk => {
      data += chunk;
    });
    
    res.on('end', () => {
      const outputPath = path.join(process.cwd(), 'dist', 'client', 'index.html');
      fs.writeFileSync(outputPath, data);
      console.log(`\nSuccessfully generated index.html at ${outputPath}`);
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', preview.pid, '/f', '/t']);
      } else {
        preview.kill();
      }
      process.exit(0);
    });
    
  }).on('error', (e) => {
    console.error(`Error generating HTML: ${e.message}`);
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', preview.pid, '/f', '/t']);
    } else {
      preview.kill();
    }
    process.exit(1);
  });
}, 5000); // Wait 5 seconds for the preview server to fully boot

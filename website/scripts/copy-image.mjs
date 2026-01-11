import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const attachmentsPath = path.join(__dirname, '../../vault/attachments');
const publicPath = path.join(__dirname, '../public/attachments');

if (fs.existsSync(attachmentsPath)) {
  fs.copySync(attachmentsPath, publicPath);
  console.log('✅ Images copied to public folder');
} else {
  console.log('ℹ️ No attachments folder found');
}
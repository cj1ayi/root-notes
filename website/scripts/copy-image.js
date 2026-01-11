const fs = require('fs-extra');
const path = require('path');

const attachmentsPath = path.join(__dirname, '../../vault/attachments');
const publicPath = path.join(__dirname, '../public/attachments');

if (fs.existsSync(attachmentsPath)) {
  fs.copySync(attachmentsPath, publicPath);
  console.log('✅ Images copied to public folder');
} else {
  console.log('ℹ️ No attachments folder found');
}
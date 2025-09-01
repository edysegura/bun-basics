import { execSync } from 'node:child_process'
import { readdir, stat } from 'node:fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get the dist directory path
const distDir = join(__dirname, '..', 'dist')

try {
  // Find CSS files in dist
  const files = await readdir(distDir)
  const cssFiles = files.filter((file) => file.endsWith('.css'))

  if (cssFiles.length === 0) {
    console.log('No CSS files found in dist directory')
    process.exit(0)
  }

  console.log('Found CSS files:', cssFiles)

  // Run PurgeCSS for each CSS file
  for (const cssFile of cssFiles) {
    const cssPath = join(distDir, cssFile)

    // Get original file size
    const stats = await stat(cssPath)
    const originalSize = stats.size
    console.log(
      `Original CSS file size: ${(originalSize / 1024).toFixed(2)} KB`,
    )

    console.log(`Purging CSS: ${cssFile}`)

    try {
      // Use a simple command that should work on Windows
      const command = `npx purgecss --css "${cssFile}" --content "../src/**/*.{html,ts,tsx,js,jsx}" "../index.html" --output "." --safelist html,body,head,title,meta,link,script,div,h1,h2,h3,h4,h5,h6,p,span,a,img,ul,ol,li,table,thead,tbody,tr,th,td,form,input,button,label,select,textarea,fieldset,legend,mark,code,pre,blockquote,hr,br,container,form,result,primary,secondary,contrast,outline,disabled,loading,error,success,warning`

      execSync(command, { stdio: 'inherit', cwd: distDir })

      // Get file size after purging
      const finalStats = await stat(cssPath)
      const finalSize = finalStats.size
      const reduction = originalSize - finalSize
      const reductionPercent = ((reduction / originalSize) * 100).toFixed(2)

      console.log(
        `CSS file size after purging: ${(finalSize / 1024).toFixed(2)} KB`,
      )
      console.log(
        `Size reduction: ${(reduction / 1024).toFixed(
          2,
        )} KB (${reductionPercent}%)`,
      )
    } catch (error) {
      console.error(`Error purging CSS file ${cssFile}:`, error.message)
    }
  }

  console.log('CSS purging completed!')
} catch (error) {
  console.error('Error during CSS purging:', error.message)
  process.exit(1)
}

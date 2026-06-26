fix
Use when you have lint errors, formatting issues, or before committing code to ensure it passes CI.
Fix Lint and Formatting
Instructions
Run yarn prettier to fix formatting
Run yarn linc to check for remaining lint issues
Report any remaining manual fixes needed
Common Mistakes
Running prettier on wrong files - yarn prettier only formats changed files
Ignoring linc errors - These will fail CI, fix them before committing